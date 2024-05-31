document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');
    const resumeIframe = document.getElementById('resume-iframe');
  
    resumeForm.addEventListener('input', updatePreview);
  
    function updatePreview() {
      const name = document.getElementById('input-name').value;
      const email = document.getElementById('input-email').value;
      const objective = document.getElementById('input-objective').value;
      const hobbies = document.getElementById('input-hobbies').value;
  
      const educationEntries = document.querySelectorAll('.education-entry');
      const workEntries = document.querySelectorAll('.work-entry');
      const referenceEntries = document.querySelectorAll('.reference-entry');
  
      const educationContent = Array.from(educationEntries).map(entry => {
        const school = entry.querySelector('.input-school').value;
        const degree = entry.querySelector('.input-degree').value;
        const grade = entry.querySelector('.input-grade').value;
        return `<div class="section"><strong>${school}</strong> - ${degree} (${grade})</div>`;
      }).join('');
  
      const workContent = Array.from(workEntries).map(entry => {
        const company = entry.querySelector('.input-company').value;
        const position = entry.querySelector('.input-position').value;
        return `<div class="section"><strong>${company}</strong> - ${position}</div>`;
      }).join('');
  
      const referenceContent = Array.from(referenceEntries).map(entry => {
        const referenceName = entry.querySelector('.input-reference-name').value;
        const referenceContact = entry.querySelector('.input-reference-contact').value;
        return `<div class="section"><strong>${referenceName}</strong> - ${referenceContact}</div>`;
      }).join('');
  
      const iframeDoc = resumeIframe.contentDocument;
      iframeDoc.getElementById('name').innerText = name;
      iframeDoc.getElementById('email').innerText = email;
      iframeDoc.getElementById('objective').innerText = objective;
      iframeDoc.getElementById('hobbies').innerText = hobbies;
      iframeDoc.getElementById('education').innerHTML = educationContent;
      iframeDoc.getElementById('work').innerHTML = workContent;
      iframeDoc.getElementById('references').innerHTML = referenceContent;
    }
  });
  