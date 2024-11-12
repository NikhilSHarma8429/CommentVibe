import { FaLongArrowAltRight } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const [chartImage, setChartImage] = useState(null);
  const [inputValue, setInputValue] = useState(""); // The URL input value state
  const [feedbackText, setFeedbackText] = useState("")

  // State to hold sentiment input (currently not used in this snippet)
  const [sentiment, setSentiment] = useState("");

  // Reference to the sentiment section for smooth scrolling
  const sentimentRef = useRef(null);

  // Function to scroll to sentiment section
  const scrollToSentiment = () => {
    sentimentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle the sentiment input change (for other parts of the app)
  const handleSentimentChange = (e) => {
    setSentiment(e.target.value);
  };

  // Function to handle the input change for video URL
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // UseEffect to check when inputValue changes
  useEffect(() => {
    console.log("Updated inputValue:", inputValue);
  }, [inputValue]); // This will log whenever inputValue updates

  // Function to handle submit
  const handleSubmit = async () => {
    if (inputValue.trim() === "") {
      alert("Please enter a valid URL!");
      return;
    }

    try {
      // Extract the video ID from the URL
      const videoId = inputValue.replace('https://www.youtube.com/watch?v=', '').replace('http://www.youtube.com/watch?v=', '');
      console.log('Extracted video ID:', videoId);

      // Make an HTTP request to the FastAPI server (uncomment for real requests)
      const response = await axios.get(`http://localhost:8000/fetch-comments-csv?videoId=${videoId}`);
      console.log(response);

      // Example: Simulating the API call for a pie chart
      const chartResponse = await axios.get("http://localhost:8000/sentiment-analysis", {
        responseType: "blob", // Important to handle the image correctly
      });

      // Create an object URL from the response blob (image)
      const imageUrl = URL.createObjectURL(chartResponse.data);
      setChartImage(imageUrl); // Set the image URL to display

      // const temp = await axios.get("http://localhost:8000/feedback")
      // setFeedbackText(temp)
    } catch (error) {
      console.error("Error fetching the pie chart:", error);
    }
  };

  return (
    <main className="hero-section-main">
      <div className="container grid grid-two-cols">
        <div className="hero-content">
          <h1 className="heading-xl">
            Analyze the Pulse of Conversations: Discover Insights Behind Every Comment!
          </h1>
          <p className="paragraph">
            Uncover the true sentiment behind every comment with our advanced AI-powered sentiment analyzer. Whether it's positive, negative, or neutral, our tool helps you gain valuable insights from social media conversations. Analyze trends, understand audience emotions, and get suggestions on how to enhance your content. Join us in turning feedback into actionable intelligence!
          </p>
          <button className="btn btn-darken btn-inline bg-white-box" onClick={scrollToSentiment}>
            Get Started <FaLongArrowAltRight />
          </button>
        </div>
        <div className="hero-image">
          <video
            src="/images/Commentvibevd.mp4"
            alt="Our Logo"
            className="banner-image"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>

      {/* Sentiment Section */}
      <section className="sentiment-section" ref={sentimentRef}>
        <label className="sentiment-label">Enter Your Social Media Post Link</label>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          style={{ width: "50rem", height: "3rem", textAlign: "center", fontFamily: "urbanist" }}
          placeholder="Social Media Post Link"
        />
        <button className="btn-submit" onClick={handleSubmit}>
          Analyze Sentiment
        </button>
        {chartImage ? (
          // Display the pie chart image if available
          <img src={chartImage} alt="Sentiment Analysis Pie Chart" />
        ) : (
          <p style={{ color: "black" }}>Loading pie chart...</p>
        )}
        <p style={{color: "black"}}>{feedbackText.data}</p>
        {/* {feedbackText} */}
        {console.log("feedback -> ", feedbackText.data)}
      </section>
    </main>
  );
};
