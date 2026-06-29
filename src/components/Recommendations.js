import scss from "../styles/Recommendations.module.scss";

const recommendations = [
  {
    name: "Anand Kumar Singh",
    headline: "Deloitte USI | Ex Civica | Ex ITC Infotech | React JS | .Net Core | Redux",
    text: "He is a perfectly skilled frontend developer with whom I have closely worked and can assure about the optimised code he used to write and the knowledge he has in his domain.",
    relation: "Worked with Snehasis on the same team",
    date: "July 19, 2023",
    initials: "AS"
  },
  {
    name: "Mahender Kumar",
    headline: ".Net Full Stack Developer",
    text: "Snehasis is a very skilled and efficient developer. He is also a great team player. An inspiration for others.",
    relation: "Worked with Snehasis on the same team",
    date: "July 19, 2023",
    initials: "MK"
  }
];

export default function Recommendations() {
  return (
    <section id="recommendations" className={scss.section}>
      <header className={scss.header}>
        <h2>Recommendations</h2>
        <span className={scss.subtitle}>Testimonials from LinkedIn</span>
      </header>

      <div className={scss.grid}>
        {recommendations.map((rec, i) => (
          <div key={i} className={scss.card}>
            <span className={scss.quote_icon}>“</span>
            
            <p className={scss.quote_text}>
              {rec.text}
            </p>
            
            <div className={scss.divider} />
            
            <div className={scss.author_info}>
              <div className={scss.avatar}>
                {rec.initials}
              </div>
              <div className={scss.author_meta}>
                <h3 className={scss.author_name}>{rec.name}</h3>
                <p className={scss.author_headline}>{rec.headline}</p>
                <span className={scss.relation_date}>
                  {rec.relation} • {rec.date}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
