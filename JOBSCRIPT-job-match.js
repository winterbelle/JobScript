// Simulate user input (you can later pull from resume data or storage)
const userSkills = (localStorage.getItem("userSkills") || "").split(",");
const desiredPosition = localStorage.getItem("desiredPosition") || "";


function getMatchScore(text, keywords) {
  const lowerText = text.toLowerCase();
  return keywords.reduce((score, keyword) => {
    return lowerText.includes(keyword.toLowerCase()) ? score + 1 : score;
  }, 0);
}

db.collection("jobListings").get().then(snapshot => {
  const jobMatchesDiv = document.getElementById("jobMatches");
  let html = "";

  snapshot.forEach(doc => {
    const job = doc.data();
    const combinedText = job.description + " " + job.requirements + " " + job.jobTitle;
    const score = getMatchScore(combinedText, [...userSkills, desiredPosition]);

    if (score > 0) {
      html += `
        <div class="job-card">
          <h3>${job.jobTitle} at ${job.company}</h3>
          <p><strong>Location:</strong> ${job.location}</p>
          <p><strong>Description:</strong> ${job.description}</p>
          <p><strong>Requirements:</strong> ${job.requirements}</p>
          <p><strong>Match Score:</strong> ${score}</p>
        </div>
        <hr>
      `;
    }
  });

  jobMatchesDiv.innerHTML = html || "<p>No matches found based on your current resume.</p>";
});
