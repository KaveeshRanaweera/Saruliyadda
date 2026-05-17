document.addEventListener('DOMContentLoaded', () => {

    // ==============================
    // 0. Loader Removal
    // ==============================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.remove('loading');
            }, 500);
        }, 800);
    }

    // ==============================
    // 1. Mobile Navigation
    // ==============================
    const toggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (toggle) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            navMenu.classList.remove('open');
        });
    });

    // ==============================
    // 2. Navbar Scroll & Active Link
    // ==============================
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ==============================
    // 3. Hero Slider
    // ==============================
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.getElementById('heroDots');
    let currentSlide = 0;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        setInterval(() => {
            goToSlide((currentSlide + 1) % slides.length);
        }, 5000);
    }

    // ==============================
    // 4. Scroll Reveal Animations
    // ==============================
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));

    // ==============================
    // 5. Back to Top Button
    // ==============================
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==============================
    // 6. Contact Form (WhatsApp redirect)
    // ==============================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = contactForm.querySelector('input[type="text"]').value;
            const email = contactForm.querySelector('input[type="email"]').value;
            const message = contactForm.querySelector('textarea').value;

            const whatsappMsg = encodeURIComponent(
                `Hi Saruliyadda! 🌱\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
            );
            window.open(`https://wa.me/94777676958?text=${whatsappMsg}`, '_blank');
            contactForm.reset();
        });
    }

    // ==============================
    // 7. Product Catalog
    // ==============================
    const allProducts = [
        // Saruliyadda Range
        { name: "Compost 05 KG", cat: "saruliyadda", img: "Images/Compost05KG.jpg" },
        { name: "Compost 10 KG", cat: "saruliyadda", img: "Images/Compost10KG.jpg" },
        { name: "Compost 20 KG", cat: "saruliyadda", img: "Images/Compost20KG.jpg" },
        { name: "Coco Chips", cat: "saruliyadda", img: "Images/CocoChips.jpg" },
        { name: "Coir Dust", cat: "saruliyadda", img: "Images/CoirDust.jpg" },
        { name: "Cattle Manure", cat: "saruliyadda", img: "Images/CattleMannure.jpg" },
        { name: "Dahaiyya", cat: "saruliyadda", img: "Images/Dhaiyya.jpg" },

        // Unipower
        { name: "Yara Mila Target", cat: "unipower", img: "Images/YaraMilaTarget.jpg" },
        { name: "Yara Mila Complex", cat: "unipower", img: "Images/YaraMilaComplex.jpg" },
        { name: "Yara Mila Winner", cat: "unipower", img: "Images/YaraMilaWinner.jpg" },
        { name: "Yara Mila Grower", cat: "unipower", img: "Images/YaraMilaGrover.jpg" },
        { name: "Yara Mila Calcinit", cat: "unipower", img: "Images/YaraMilaCalcinit.jpg" },
        { name: "Yara Liva Tropicote", cat: "unipower", img: "Images/YaraLivaTropicote.jpg" },
        { name: "Yara Mila 25-7-7", cat: "unipower", img: "Images/YaraMila25-7-7.jpg" },
        { name: "Yara Mila 15-15-15", cat: "unipower", img: "Images/YaraMila15-15-15.jpg" },
        { name: "Nutrivant Plus", cat: "unipower", img: "Images/NutrivantPlus.jpg" },
        { name: "Osmocote High N", cat: "unipower", img: "Images/OsmocoteHighN.jpg" },
        { name: "Osmocote High K", cat: "unipower", img: "Images/OsmocoteHighK.jpg" },
        { name: "Osmocote All Purpose", cat: "unipower", img: "Images/OsmocoteAllPurpose.jpg" },
        { name: "Albert Solution", cat: "unipower", img: "Images/AlbertSolution.jpg" },
        { name: "Agri Phoska YPM", cat: "unipower", img: "Images/AgriPhoskaYPM.png" },
        { name: "Agri Phoska APM", cat: "unipower", img: "Images/AgroPhoskaAPM.png" },
        { name: "Grow More Nitro Plus", cat: "unipower", img: "Images/GrowMoreNitroPlus.jpg" },
        { name: "Grow More Plant Starter", cat: "unipower", img: "Images/GrowMorePlantStarter.jpg" },
        { name: "Grow More K44", cat: "unipower", img: "Images/GrowMoreK44.jpg" },
        { name: "Grow More Bloom Special", cat: "unipower", img: "Images/GrowMoreBloomSpecial.jpg" },
        { name: "Grow More 3 in 1", cat: "unipower", img: "Images/GrowMore3in1.jpg" },
        { name: "Crop Master", cat: "unipower", img: "Images/CropMaster.jpg" },
        { name: "Clonex", cat: "unipower", img: "Images/Clonex.jpg" },
        { name: "Rapid Root", cat: "unipower", img: "Images/RapidRoot.jpg" },
        { name: "Yara Vita Zintrac", cat: "unipower", img: "Images/YaraVitaZintrac.png" },
        { name: "Yara Vita Bortrac", cat: "unipower", img: "Images/YaraVitaBortrac.png" },
        { name: "Biofol Green Flush", cat: "unipower", img: "Images/BiofolGreenFlush.png" },
        { name: "Biofol Flower Booster", cat: "unipower", img: "Images/BiofolFlowerBooster.png" },
        { name: "Peters Professional", cat: "unipower", img: "Images/PetersProfessional.png" },

        // Tools & Accessories
        { name: "Insect Proof Net", cat: "tools", img: "Images/InsectProofNet.jpg" },
        { name: "Poly Mulch", cat: "tools", img: "Images/PolyMulch.jpg" },
        { name: "Shade Nets", cat: "tools", img: "Images/ShadeNets.jpg" },
        { name: "Trellising Twine", cat: "tools", img: "Images/Trellising Twine.jpg" },
    ];

    const productGrid = document.getElementById('productGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('productSearch');

    let activeFilter = 'all';
    let searchQuery = '';

    function renderProducts() {
        if (!productGrid) return;

        let filtered = allProducts;

        if (activeFilter !== 'all') {
            filtered = filtered.filter(p => p.cat === activeFilter);
        }

        if (searchQuery) {
            filtered = filtered.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        productGrid.innerHTML = '';

        if (filtered.length === 0) {
            productGrid.innerHTML = `
                <div class="empty-state">
                    <i class="ph ph-magnifying-glass"></i>
                    <h4>No products found</h4>
                    <p>Try a different search term or category.</p>
                </div>
            `;
            return;
        }

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.img}" alt="${product.name}" loading="lazy" onerror="this.src='HomePageImages/Logo.png'">
                <div class="card-cat">${product.cat}</div>
                <h4>${product.name}</h4>
            `;
            productGrid.appendChild(card);
        });
    }

    // Initial render
    renderProducts();

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeFilter = btn.dataset.filter;
            renderProducts();
        });
    });

    // Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            renderProducts();
        });
    }

    // ==============================
    // 8. Floating Particles (Leaves)
    // ==============================
    const leafContainer = document.getElementById('floatingLeaves');
    if (leafContainer) {
        const leafIcons = ['ph-leaf', 'ph-clover', 'ph-sparkle'];
        const numLeaves = 20;
        
        for(let i = 0; i < numLeaves; i++) {
            setTimeout(() => {
                const leaf = document.createElement('i');
                const randomIcon = leafIcons[Math.floor(Math.random() * leafIcons.length)];
                leaf.className = `ph-fill ${randomIcon} leaf`;
                
                // Randomize properties
                const size = Math.random() * 1.5 + 0.8; // 0.8rem to 2.3rem
                const left = Math.random() * 100;
                const duration = Math.random() * 15 + 10; // 10s to 25s
                const delay = Math.random() * 10;
                
                leaf.style.left = `${left}%`;
                leaf.style.fontSize = `${size}rem`;
                leaf.style.animationDuration = `${duration}s`;
                leaf.style.animationDelay = `${delay}s`;
                leaf.style.color = `var(--green-${Math.floor(Math.random() * 4 + 3) * 100})`; // green-300 to green-600
                
                leafContainer.appendChild(leaf);
            }, i * 200);
        }
    }
});
