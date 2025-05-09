console.log("JOBSCRIPT-post-job.js loaded");
console.log("db available:", typeof db !== "undefined");


document.getElementById("jobForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Stop page refresh
  console.log("Submit button clicked");

  // Get form values
  const company = document.getElementById("company").value.trim();
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const location = document.getElementById("location").value.trim();
  const description = document.getElementById("description").value.trim();
  const requirements = document.getElementById("requirements").value.trim();

  // Validate all fields are filled
  if (!company || !jobTitle || !location || !description || !requirements) {
    document.getElementById("jobOutput").innerHTML = `<p style="color:red;">Please fill out all fields.</p>`;
    return;
  }

  try {
    // Save to Firestore
    await db.collection("jobListings").add({
      company,
      jobTitle,
      location,
      description,
      requirements,
      timestamp: new Date()
    });

    document.getElementById("jobOutput").innerHTML = `<p style="color:green;">Job posted successfully!</p>`;

    // Optional: Reset form
    document.getElementById("jobForm").reset();
  } catch (err) {
    console.error("Error posting job:", err);
    document.getElementById("jobOutput").innerHTML = `<p style="color:red;">Failed to post job. Check console for details.</p>`;
  }
});
