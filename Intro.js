const text = `Hi, my name is Melly.
Nice to meet you. Here, I want to show you the world that I see.
I want to interpret the things that I love, fear, savor, and sometimes hate,
and the things that I love and that love me, through my perspective.
What I'm going to show you now sometimes expresses me, sometimes makes me nervous,
and sometimes makes me very excited.
I hope you enjoy the things that I love.`;

// Typing Animation Function
let i = 0;
function typeEffect() {
  if (i < text.length) {
    document.getElementById("intro-text").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 50); // Typing speed
  }
}

window.onload = typeEffect;