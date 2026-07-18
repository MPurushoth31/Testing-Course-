document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menu = document.querySelector(".menu");
    const navMenu = document.querySelector(".nav nav");
    const navbar = document.querySelector(".nav");

    menu.addEventListener("click", () => {
        menu.classList.toggle("active");
        navMenu.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    });

    document.querySelectorAll(".nav nav a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menu.classList.remove("active");
            document.body.classList.remove("menu-open");
        });
    });

    // 2. Smart Navbar Scroll & ScrollSpy
    let lastScroll = 0;
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav nav a[href^='#']");

    window.addEventListener("scroll", () => {
        const current = window.scrollY;
        
        // Glass effect
        if (current > 25) {
            navbar.classList.add("nav-scrolled");
        } else {
            navbar.classList.remove("nav-scrolled");
        }
        
        // Hide on scroll down, show on scroll up
        if (current > 120 && current > lastScroll) {
            navbar.classList.add("nav-hidden");
        } else {
            navbar.classList.remove("nav-hidden");
        }
        lastScroll = current;

        // ScrollSpy (Active link highlight)
        let currentSection = "";
        sections.forEach(section => {
            if (current + 180 >= section.offsetTop) {
                currentSection = section.getAttribute("id");
            }
        });
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSection}`) {
                link.classList.add("active");
            }
        });
    });

    // 3. Reveal Animation on Scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Curriculum Modules Accordion
    document.querySelectorAll('.module-head').forEach(btn => {
        btn.addEventListener('click', () => {
            const m = btn.parentElement;
            const isOpen = m.classList.contains('open');
            m.classList.toggle('open');
            btn.setAttribute('aria-expanded', !isOpen);
        });
    });

    // 5. FAQ Accordion
    document.querySelectorAll('.faq-list button').forEach(btn => {
        btn.addEventListener('click', () => {
            const a = btn.parentElement;
            a.classList.toggle('open');
            btn.querySelector('b').style.transform = a.classList.contains('open') ? 'rotate(45deg)' : 'rotate(0deg)';
        });
    });

    // 6. Copy UPI ID with Toast Notification
    const copyBtn = document.getElementById('copyUpi');
    const toast = document.getElementById('toast');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', async function() {
            const upiText = document.getElementById('upi').textContent;
            try {
                await navigator.clipboard.writeText(upiText);
                this.textContent = 'Copied ✓';
                
                // Show Premium Toast Notification
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    this.textContent = 'Copy';
                }, 3000);
                
            } catch (err) {
                console.error('Failed to copy', err);
            }
        });
    }

    // 7. Prevent default on payment buttons if on Desktop (Optional Enhancement)
    document.querySelectorAll('.app-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Check if device is desktop
            if(!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                e.preventDefault();
                alert("Please scan the QR code to pay on Desktop. Direct App links work on Mobile phones.");
            }
        });
    });

    // 8. Auto-typing Excel Formula Demo
    const demoSteps = [
        { formula: '=SUM(D2:D5)', status: 'Calculating Formulas...' },
        { formula: '=XLOOKUP("Laptop",B2:B5,D2:D5)', status: 'Analyzing with Pivot Table...' },
        { formula: '=GETPIVOTDATA("Sales",A1)', status: 'Creating Interactive Charts...' }
    ];
    let demoIndex = 0;

    function runFormulaDemo() {
        const target = document.getElementById('typedFormula');
        const status = document.getElementById('demoStatus');
        if (!target || !status) return;
        
        const step = demoSteps[demoIndex % demoSteps.length];
        target.textContent = '';
        status.textContent = step.status;
        let i = 0;
        
        const timer = setInterval(() => {
            target.textContent += step.formula.charAt(i++);
            if (i >= step.formula.length) {
                clearInterval(timer);
                setTimeout(() => {
                    demoIndex++;
                    runFormulaDemo();
                }, 2500);
            }
        }, 55);
    }
    runFormulaDemo();

    // 9. Animated Counters
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if(!el.classList.contains('counted')) {
                    el.classList.add('counted');
                    const target = +el.dataset.target;
                    const suffix = el.dataset.suffix || '';
                    let start = 0;
                    const duration = 1200;
                    const stepTime = 30;
                    const inc = target / (duration / stepTime);
                    
                    const timer = setInterval(() => {
                        start += inc;
                        if (start >= target) {
                            start = target;
                            clearInterval(timer);
                        }
                        el.textContent = Math.floor(start) + suffix;
                    }, stepTime);
                }
            }
        });
    }, { threshold: 0.35 });
    
    document.querySelectorAll('.counter').forEach(counter => countObserver.observe(counter));

    // 10. Premium Magnetic Button Effect (Mouse tracking on buttons)
    if (window.innerWidth > 900) {
        const magneticElements = document.querySelectorAll('.magnetic');
        magneticElements.forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;
                el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }

    // 11. Ripple Feedback Effect
    document.querySelectorAll('.btn, .app-btn, .module-head, .faq-list button, .socials a, .nav a, .stat-card').forEach(el => {
        el.classList.add('ripple-ready');
        el.addEventListener('click', function(e) {
            const r = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            r.className = 'click-ripple';
            r.style.width = r.style.height = size + 'px';
            r.style.left = (e.clientX - rect.left - size / 2) + 'px';
            r.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(r);
            setTimeout(() => r.remove(), 600);
        });
    });

    // 12. Mouse Tilt Effect for Excel window
    if (window.innerWidth > 900) {
        const excelApp = document.querySelector(".excel-app");
        if(excelApp) {
            excelApp.addEventListener("mousemove", (e) => {
                const rect = excelApp.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateY = ((x / rect.width) - 0.5) * 8;
                const rotateX = ((y / rect.height) - 0.5) * -8;
                excelApp.style.transform = `perspective(1600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });
            excelApp.addEventListener("mouseleave", () => {
                excelApp.style.transform = `perspective(1600px) rotateX(4deg) rotateY(-4deg) translateY(0px)`;
            });
        }
    }

    // 13. Fake Urgency Countdown (Simulate seats filling up)
    const seatsText = document.getElementById('seats-left');
    if (seatsText) {
        setTimeout(() => {
            seatsText.textContent = "Only 5 Seats Left";
            seatsText.style.color = "#ff3d71";
            seatsText.style.transform = "scale(1.1)";
            setTimeout(() => seatsText.style.transform = "scale(1)", 300);
        }, 8000);
    }

    // Set dynamic year in footer
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

});
