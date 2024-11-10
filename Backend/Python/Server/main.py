import os
from fastapi import FastAPI, HTTPException
import httpx
from fastapi.responses import FileResponse
from pathlib import Path
import pickle
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import io
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import openai
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of allowed origins, you can add more if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

openai.api_key = os.getenv("OPENAI_API_KEY") 

# Define file paths for the model and vectorizer
MODEL_PATH = Path.cwd() / "knn_model.pkl"
VECTORIZER_PATH = Path.cwd() / "tfidf_vectorizer.pkl"

# Load model and vectorizer when the application starts
try:
    with open(MODEL_PATH, 'rb') as model_file:
        loaded_knn = pickle.load(model_file)
    with open(VECTORIZER_PATH, 'rb') as vectorizer_file:
        tfidf_vectorizer = pickle.load(vectorizer_file)
except FileNotFoundError:
    raise RuntimeError("Model or vectorizer file not found.")

# Express backend URL
EXPRESS_URL = "http://localhost:3000/download-csv"  # Express server that returns the CSV

@app.get("/")
async def root():
    return {"message": "FastAPI server is working!"}

@app.get("/fetch-comments-csv")
async def fetch_comments_csv(videoId: str):
    # Prepare the query parameters to pass to the Express backend
    params = {"videoId": videoId}

    try:
        # Make a GET request to the Express server to fetch the CSV file
        async with httpx.AsyncClient() as client:
            response = await client.get(EXPRESS_URL, params=params)

        # Check if the response status is 200 (OK)
        if response.status_code == 200:
            # Set file path as comments.csv
            file_path = Path.cwd() / "comments.csv"
            with open(file_path, "wb") as f:
                f.write(response.content)

            # Return the file as a response, allowing the client to download it
            # return FileResponse(file_path, media_type="text/csv", headers={"Content-Disposition": "attachment; filename=comments.csv"})
            return "Working"

        else:
            return {"status": "failed", "message": "Error fetching CSV from Express backend"}
    
    except httpx.RequestError as e:
        return {"status": "failed", "message": f"An error occurred: {e}"}

@app.get("/sentiment-analysis")
async def analyze():
    df = pd.read_csv("comments.csv")
    
    try:
        negative_comments = []
        number = [0, 0, 0]  # [negative, neutral, positive]
        
        for i in range(df.shape[0]):
            input_sentence = df["Comment"][i]
            # Transform the input sentence using the TF-IDF vectorizer
            input_tfidf = tfidf_vectorizer.transform([input_sentence])

            # Predict sentiment using the trained KNN model
            predicted_sentiment = loaded_knn.predict(input_tfidf)
            
            if int(predicted_sentiment[0]) == -1:
                negative_comments.append(input_sentence)
                number[0] += 1
            elif int(predicted_sentiment[0]) == 0:
                number[1] += 1
            else:
                number[2] += 1

        # Generate pie chart
        labels = ['Negative', 'Neutral', 'Positive']
        sizes = number
        colors = ['#FF6347', '#FFD700', '#32CD32']
        explode = (0.1, 0, 0)  # explode the 1st slice (Negative)

        fig, ax = plt.subplots()
        ax.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=90)
        ax.axis('equal')  # Equal aspect ratio ensures that pie is drawn as a circle.

        # Save the pie chart to a BytesIO object for fast serving
        img_io = io.BytesIO()
        plt.savefig(img_io, format="png")
        img_io.seek(0)

        # Return the pie chart as an image
        return StreamingResponse(img_io, media_type="image/png")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing the sentiment analysis: {e}")


class CommentsRequest(BaseModel):
    comments: List[str]

# Define the endpoint
@app.post("/feedback")
async def generate_feedback(request: CommentsRequest):
    try:
        # Combine comments into a single prompt
        comments_text = "\n".join(request.comments)
        
        # Generate a prompt for ChatGPT to analyze and give feedback on negative and neutral comments
        prompt = f"Provide feedback to improve based on the following negative and neutral comments:\n{comments_text}"

        # Call the OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150  # Adjust as necessary
        )

        # Extract feedback response from API output
        feedback = response.choices[0].message['content']
        return {"feedback": feedback}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating feedback: {str(e)}")
