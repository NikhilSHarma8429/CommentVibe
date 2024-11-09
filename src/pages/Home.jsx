// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useRef } from "react";

// export const Home = () => {
//   // Reference to the sentiment section for smooth scrolling
//   const sentimentRef = useRef(null);

//   // Function to scroll to sentiment section
//   const scrollToSentiment = () => {
//     sentimentRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <main className="hero-section-main">
//       <div className="container grid grid-two-cols">
//         <div className="hero-content">
//           <h1 className="heading-xl">
//             Analyze the Pulse of Conversations: Discover Insights Behind Every Comment!
//           </h1>
//           <p className="paragraph">
//             Uncover the true sentiment behind every comment with our advanced AI-powered sentiment analyzer. Whether it's positive, negative, or neutral, our tool helps you gain valuable insights from social media Conversations. Analyse trends, understand audience emotions and get suggestions on how to enhance your content. Join us in turning feedback into actionable intelligence!
//           </p>
//           <button className="btn btn-darken btn-inline bg-white-box">
//             Get Started <FaLongArrowAltRight />
//           </button>
//         </div>
//         <div className="hero-image">
//           <video
//             src="/images/Commentvibevd.mp4"
//             alt="Our Logo"
//             className="banner-image"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />
//         </div>
//       </div>

//       {/* Sentiment Section */}
//       <section className="sentiment-section" ref={sentimentRef}>
//         <label className="sentiment-label">Enter Your Sentiment Here</label>
//         <textarea className="sentiment-textarea" placeholder="Type here..." />
//       </section>
//     </main>
//   );
// };


// import { FaLongArrowAltRight } from "react-icons/fa";
// import { useRef, useState } from "react";

// export const Home = () => {
//   // Reference to the sentiment section for smooth scrolling
//   const sentimentRef = useRef(null);
//   // State to hold the sentiment input
//   const [sentiment, setSentiment] = useState("");

//   // Function to scroll to sentiment section
//   const scrollToSentiment = () => {
//     sentimentRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Function to handle the sentiment input change
//   const handleSentimentChange = (e) => {
//     setSentiment(e.target.value);
//   };

//   // Function to send sentiment to the learning model
//   const handleSubmit = () => {
//     if (sentiment.trim() !== "") {
//       // Here, send the sentiment to your learning model or API
//       console.log("Sending sentiment to model:", sentiment);
//       // You can integrate your API call here
//     } else {
//       alert("Please enter some sentiment to analyze!");
//     }
//   };

//   return (
//     <main className="hero-section-main">
//       <div className="container grid grid-two-cols">
//         <div className="hero-content">
//           <h1 className="heading-xl">
//             Analyze the Pulse of Conversations: Discover Insights Behind Every Comment!
//           </h1>
//           <p className="paragraph">
//             Uncover the true sentiment behind every comment with our advanced AI-powered sentiment analyzer. Whether it's positive, negative, or neutral, our tool helps you gain valuable insights from social media Conversations. Analyze trends, understand audience emotions and get suggestions on how to enhance your content. Join us in turning feedback into actionable intelligence!
//           </p>
//           <button className="btn btn-darken btn-inline bg-white-box" onClick={scrollToSentiment}>
//             Get Started <FaLongArrowAltRight />
//           </button>
//         </div>
//         <div className="hero-image">
//           <video
//             src="/images/Commentvibevd.mp4"
//             alt="Our Logo"
//             className="banner-image"
//             autoPlay
//             loop
//             muted
//             playsInline
//           />
//         </div>
//       </div>

//       {/* Sentiment Section */}
//       <section className="sentiment-section" ref={sentimentRef}>
//         <label className="sentiment-label">Enter Your Sentiment Here</label>
//         <textarea
//           className="sentiment-textarea"
//           placeholder="Type here..."
//           value={sentiment}
//           onChange={handleSentimentChange}
//         />
//         <button className="btn-submit" onClick={handleSubmit}>
//           Analyze Sentiment
//         </button>
//       </section>
//     </main>
//   );
// };


import { FaLongArrowAltRight } from "react-icons/fa";
import { useRef, useState } from "react";

export const Home = () => {
  // Reference to the sentiment section for smooth scrolling
  const sentimentRef = useRef(null);
  // State to hold the sentiment input
  const [sentiment, setSentiment] = useState("");

  // Function to scroll to sentiment section
  const scrollToSentiment = () => {
    sentimentRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Function to handle the sentiment input change
  const handleSentimentChange = (e) => {
    setSentiment(e.target.value);
  };

  // Function to send sentiment to the learning model
  const handleSubmit = () => {
    if (sentiment.trim() !== "") {
      // Here, send the sentiment to your learning model or API
      console.log("Sending sentiment to model:", sentiment);
      // You can integrate your API call here
    } else {
      alert("Please enter some sentiment to analyze!");
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
            Uncover the true sentiment behind every comment with our advanced AI-powered sentiment analyzer. Whether it's positive, negative, or neutral, our tool helps you gain valuable insights from social media Conversations. Analyze trends, understand audience emotions and get suggestions on how to enhance your content. Join us in turning feedback into actionable intelligence!
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
        <label className="sentiment-label">Enter Your Sentiment Here</label>
        <textarea
          className="sentiment-textarea"
          placeholder="Type here..."
          value={sentiment}
          onChange={handleSentimentChange}
        />
        <button className="btn-submit" onClick={handleSubmit}>
          Analyze Sentiment
        </button>
      </section>
    </main>
  );
};
