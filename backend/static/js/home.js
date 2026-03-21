function showDemo(type)
{
  const img = document.getElementById('demoImage');
  const text = document.getElementById('demoText');

  if (type === "chatbot") {
    img.src = "static/images/chatbot.png";
    text.innerText = "AI chatbot helping farmers with instant answers.";
  }

  if (type === "crop") {
    img.src = "static/images/croprecommedation.png";
    text.innerText = "Smart crop recommendation based on soil and weather.";
  }

  if (type === "disease") {
    img.src = "static/images/AIMLimage.png";
    text.innerText = "Upload leaf image to detect crop disease.";
  }

  if (type === "interview") {
    img.src = "static/images/video.png";
    text.innerText = "Real-world farmer success stories.";
  }
}
