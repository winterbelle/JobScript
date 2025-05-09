function updateResume() {
  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const age = document.getElementById("age").value;
  const education = document.getElementById("education").value;
  const position = document.getElementById("position").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;
  const selectedTemplate = document.querySelector('input[name="template"]:checked').value;
  localStorage.setItem("userSkills", skills);
  localStorage.setItem("desiredPosition", position);


  const resumeHTML = `
    <h3>${name || "Your Name"}</h3>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Education:</strong> ${education}</p>
    <p><strong>Desired Position:</strong> ${position}</p>
    <p><strong>Skills:</strong> ${skills}</p>
    <p><strong>Experience:</strong><br>${experience}</p>
  `;

  const output = document.getElementById("output");
  output.innerHTML = resumeHTML;
  output.className = "resume-preview";
  output.classList.add(`template-${selectedTemplate}`);
}

// Live preview for all input fields
const fields = ["name", "location", "age", "education", "position", "skills", "experience"];
fields.forEach(id => {
  document.getElementById(id).addEventListener("input", updateResume);
});

// Live preview for template selection
document.querySelectorAll('input[name="template"]').forEach(radio => {
  radio.addEventListener("change", updateResume);
});

// PDF Export
async function downloadResume() {
  const selectedTemplate = document.querySelector('input[name="template"]:checked').value;
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const name = document.getElementById("name").value;
  const location = document.getElementById("location").value;
  const age = document.getElementById("age").value;
  const education = document.getElementById("education").value;
  const position = document.getElementById("position").value;
  const skills = document.getElementById("skills").value;
  const experience = document.getElementById("experience").value;

  let content = `
Name: ${name}
Location: ${location}
Age: ${age}
Education: ${education}
Desired Position: ${position}
Skills: ${skills}
Experience: ${experience}
  `;

  // Optional: change font style based on template
  switch (selectedTemplate) {
    case "modern":
      doc.setFont("helvetica", "bold");
      break;
    case "minimal":
      doc.setFont("courier", "normal");
      break;
    default:
      doc.setFont("times", "normal");
      break;
  }

  doc.setFontSize(12);
  doc.text(content, 10, 20);
  doc.save("resume.pdf");
}
