function adjustContent() {
    const content = document.getElementById('content');
    if (window.innerWidth < 768) {
        content.src = "pdfs/PYTHON.pdf"; // You can adjust the PDF for mobile if needed
    } else {
        content.src = "pdfs/PYTHON.pdf";
    }
}
// Initialize particles.js with your configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 380,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#000000" // Black particles
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false
        },
        "size": {
            "value": 3,
            "random": true
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#000000", // Black lines
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 6,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out"
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            }
        }
    },
    "retina_detect": true
});


window.addEventListener('resize', adjustContent);
window.addEventListener('load', adjustContent);



