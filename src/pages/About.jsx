import infoData from "../api/InfoData.json";

export const About = () => {
  return (
    <section className="section-about container">
      <h2 className="container-title">
        "Behind The Scenes: Meet The Team"
      </h2>

      <div className="gradient-cards">
        {infoData.map((info) => {
          const { id, Name, LinkedIn, GitHub} =
            info;
          return (
            <div className="card" key={id}>
              <div className="container-card bg-blue-box">
                <p className="card-title">{Name}</p>
                <p>
                  <span className="card-description">LinkedIn:</span>
                  {LinkedIn}
                </p>
                <p>
                  <span className="card-description">GitHub:</span>
                  {GitHub}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};