document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    // Base de données unifiée de 20 produits
    const productsData = [
        { id: "p1", name: "Disque SSD NVMe M.2", desc: "Stockage ultra-rapide Haute Performance", cat: "Stockage / Composants", img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&q=80", variants: [{ text: "256 Go - $30", price: 30 }, { text: "500 Go - $50", price: 50 }, { text: "1 To - $90", price: 90 }] },
        { id: "p2", name: "Mémoire RAM DDR4 RGB", desc: "Kit mémoire haute vitesse PC Fixe", cat: "Composants PC", img: "https://images.unsplash.com/photo-1562976540-1502c2145186?w=200&q=80", variants: [{ text: "8 Go - $35", price: 35 }, { text: "16 Go (2x8GB) - $65", price: 65 }, { text: "32 Go (2x16GB) - $120", price: 120 }] },
        { id: "p3", name: "Hoodie Coton Premium", desc: "Style urbain confort absolu", cat: "Vêtements / Mode", img: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&q=80", variants: [{ text: "Noir - M ($45)", price: 45 }, { text: "Gris - L ($45)", price: 45 }] },
        { id: "p4", name: "Casque Bluetooth ANC", desc: "Réduction de bruit active", cat: "High-Tech / Audio", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80", variants: [{ text: "Noir Mat - $89", price: 89 }, { text: "Blanc Argent - $89", price: 89 }] },
        { id: "p5", name: "Souris Gaming Sans Fil", desc: "Capteur optique 16000 DPI", cat: "Périphériques", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80", variants: [{ text: "Édition Noire - $55", price: 55 }, { text: "Édition Blanche - $60", price: 60 }] },
        { id: "p6", name: "Clavier Mécanique RGB", desc: "Switchs Red silencieux réactifs", cat: "Périphériques", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&q=80", variants: [{ text: "AZERTY - Red ($75)", price: 75 }, { text: "QWERTY - Blue ($75)", price: 75 }] },
        { id: "p7", name: "Moniteur PC 144Hz 1ms", desc: "Dalle IPS 24 pouces Full HD", cat: "Écrans / High-Tech", img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&q=80", variants: [{ text: "24\" FHD - $180", price: 180 }, { text: "27\" 2K - $260", price: 260 }] },
        { id: "p8", name: "T-Shirt Oversize Minimaliste", desc: "100% coton peigné bio", cat: "Vêtements / Mode", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=200&q=80", variants: [{ text: "Blanc - M ($20)", price: 20 }, { text: "Noir - L ($20)", price: 20 }] },
        { id: "p9", name: "Carte Graphique RTX Series", desc: "Ray Tracing & DLSS Gaming", cat: "Composants PC", img: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=200&q=80", variants: [{ text: "RTX 3060 12GB - $320", price: 320 }, { text: "RTX 4060 8GB - $380", price: 380 }] },
        { id: "p10", name: "Smartwatch Sport & Santé", desc: "Suivi cardiaque & GPS intégré", cat: "High-Tech / Accessoires", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80", variants: [{ text: "Cadran Noir - $110", price: 110 }, { text: "Cadran Silver - $110", price: 110 }] },
        { id: "p11", name: "Sac à Dos Antivol PC 15.6\"", desc: "Imperméable avec port USB", cat: "Accessoires / Voyage", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&q=80", variants: [{ text: "Gris Anthracite - $40", price: 40 }, { text: "Noir Intense - $40", price: 40 }] },
        { id: "p12", name: "Tapis de Souris Gamer XXL", desc: "Surface lisse 900x400mm antidérapant", cat: "Périphériques", img: "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=200&q=80", variants: [{ text: "Noir Uni - $22", price: 22 }, { text: "Bords RGB - $28", price: 28 }] },
        { id: "p13", name: "Ventirad CPU Watercooling", desc: "Refroidissement liquide 240mm ARGB", cat: "Composants PC", img: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=200&q=80", variants: [{ text: "240mm ARGB - $85", price: 85 }, { text: "360mm ARGB - $115", price: 115 }] },
        { id: "p14", name: "Casquette Snapback Urbaine", desc: "Style moderne ajustable", cat: "Vêtements / Accessoires", img: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=200&q=80", variants: [{ text: "Noir - $18", price: 18 }, { text: "Bleu Marine - $18", price: 18 }] },
        { id: "p15", name: "Enceinte Bluetooth Étanche IPX7", desc: "Autonomie 12h & Basses puissantes", cat: "High-Tech / Audio", img: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&q=80", variants: [{ text: "Rouge Sport - $49", price: 49 }, { text: "Noir Stealth - $49", price: 49 }] },
        { id: "p16", name: "Webcam 1080p avec Micro", desc: "Pour visioconférence & streaming", cat: "Périphériques", img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=200&q=80", variants: [{ text: "1080p 30fps - $35", price: 35 }, { text: "1080p 60fps - $55", price: 55 }] },
        { id: "p17", name: "Manette Sans Fil PC / Console", desc: "Ergonomique avec vibrations", cat: "Gaming / Accessoires", img: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=200&q=80", variants: [{ text: "Camouflage - $45", price: 45 }, { text: "Blanc Pur - $45", price: 45 }] },
        { id: "p18", name: "Support PC Portable Aluminium", desc: "Ajustable & Pliable", cat: "Bureau / Accessoires", img: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&q=80", variants: [{ text: "Argenté - $25", price: 25 }, { text: "Gris Sidéral - $25", price: 25 }] },
        { id: "p19", name: "Pantalon Jogging Techwear", desc: "Coupe ajustée et poches zippées", cat: "Vêtements / Mode", img: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=200&q=80", variants: [{ text: "Taille M ($38)", price: 38 }, { text: "Taille L ($38)", price: 38 }] },
        { id: "p20", name: "Hub USB-C 7-en-1 HDMI 4K", desc: "Ports USB 3.0, SD & Power Delivery", cat: "Accessoires / Connectivity", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&q=80", variants: [{ text: "Aluminium Gris - $32", price: 32 }] }
    ];

    // 1. GENERATION DE LA DATATABLE EN BAS
    const dataTableBody = document.getElementById("dataTableBody");
    dataTableBody.innerHTML = productsData.map(p => `
        <tr>
            <td class="img-cell"><img src="${p.img}" alt="${p.name}" class="table-product-img"></td>
            <td><strong>${p.name}</strong><br><small>${p.desc}</small></td>
            <td>${p.cat}</td>
            <td>
                <select id="var-${p.id}" class="variant-select">
                    ${p.variants.map(v => `<option value="${v.text}" data-price="${v.price}">${v.text}</option>`).join('')}
                </select>
            </td>
            <td><span class="price-display" id="price-${p.id}">$${p.variants[0].price}</span></td>
            <td><button class="btn add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-select="var-${p.id}">Ajouter</button></td>
        </tr>
    `).join('');

    $('#productsDataTable').DataTable({
        "language": {
            "sEmptyTable": "Aucune donnée disponible",
            "sInfo": "Affichage de _START_ à _END_ sur _TOTAL_ articles",
            "sInfoFiltered": "(filtré de _MAX_ articles au total)",
            "sLengthMenu": "Afficher _MENU_ articles",
            "sSearch": "Rechercher un produit :",
            "sZeroRecords": "Aucun produit correspondant trouvé",
            "oPaginate": { "sNext": "Suivant", "sPrevious": "Précédent" }
        },
        "pageLength": 10
    });

    // 2. ROTATION AUTOMATIQUE DES CARTES EN HAUT (5 PAR 5 / 8 SECONDES)
    let cardIndex = 0;
    const cardsGrid = document.getElementById("cardsGrid");

    function renderCards() {
        const currentBatch = productsData.slice(cardIndex, cardIndex + 5);
        cardsGrid.style.opacity = "0";
        
        setTimeout(() => {
            cardsGrid.innerHTML = currentBatch.map(p => `
                <div class="product-card fade-in">
                    <img src="${p.img}" alt="${p.name}">
                    <div class="product-card-body">
                        <span class="category-badge">${p.cat}</span>
                        <h3>${p.name}</h3>
                        <p class="desc">${p.desc}</p>
                        <div class="card-footer-action">
                            <select id="card-var-${p.id}" class="variant-select card-select">
                                ${p.variants.map(v => `<option value="${v.text}" data-price="${v.price}">${v.text}</option>`).join('')}
                            </select>
                            <div class="price-action">
                                <span class="price-display">$${p.variants[0].price}</span>
                                <button class="btn add-to-cart-btn" data-id="${p.id}" data-name="${p.name}" data-select="card-var-${p.id}">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
            cardsGrid.style.opacity = "1";
        }, 200);
    }

    renderCards();
    setInterval(() => {
        cardIndex = (cardIndex + 5) % productsData.length;
        renderCards();
    }, 8000);

    // 3. MISE À JOUR DES PRIX LORS DU CHANGEMENT DE VARIANTE
    $(document).on("change", ".variant-select", function () {
        const selectedOption = this.options[this.selectedIndex];
        const newPrice = selectedOption.getAttribute("data-price");
        const priceDisplay = $(this).closest("tr, .product-card-body").find(".price-display");
        priceDisplay.text(`$${newPrice}`);
    });

    // 4. GESTION DU PANIER
    const cartTableBody = document.getElementById("cartTableBody");
    const emptyCartMsg = document.getElementById("emptyCartMsg");
    const cartTotalAmount = document.getElementById("cartTotalAmount");
    const cartCount = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");
    const cartDataInput = document.getElementById("cartDataInput");
    const checkoutForm = document.getElementById("checkoutForm");
    const formAlert = document.getElementById("formAlert");

    $(document).on("click", ".add-to-cart-btn", function () {
        const id = $(this).attr("data-id");
        const name = $(this).attr("data-name");
        const selectId = $(this).attr("data-select");
        
        const selectElem = document.getElementById(selectId);
        const selectedOption = selectElem.options[selectElem.selectedIndex];
        const variantText = selectedOption.value;
        const price = parseFloat(selectedOption.getAttribute("data-price"));

        const itemKey = `${id}-${variantText}`;
        const existingItem = cart.find(item => item.key === itemKey);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ key: itemKey, id, name, variant: variantText, price, quantity: 1 });
        }

        updateCartUI();
    });

    function updateCartUI() {
        cartTableBody.innerHTML = "";
        let total = 0, count = 0;

        if (cart.length === 0) {
            emptyCartMsg.style.display = "block";
            checkoutBtn.disabled = true;
        } else {
            emptyCartMsg.style.display = "none";
            checkoutBtn.disabled = false;

            cart.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                count += item.quantity;

                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><strong>${item.name}</strong><br><small>(${item.variant})</small></td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td>${item.quantity}</td>
                    <td>$${itemTotal.toFixed(2)}</td>
                    <td><button class="remove-btn" data-index="${index}">X</button></td>
                `;
                cartTableBody.appendChild(tr);
            });
        }

        cartTotalAmount.textContent = `$${total.toFixed(2)}`;
        cartCount.textContent = count;
        cartDataInput.value = JSON.stringify(cart);

        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    // 5. SOUMISSION AJAX
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", function (e) {
            e.preventDefault();
            checkoutBtn.disabled = true;
            checkoutBtn.textContent = "Transmission...";

            fetch("send_order.php", {
                method: "POST",
                body: new FormData(checkoutForm)
            })
            .then(res => res.json())
            .then(data => {
                formAlert.style.display = "block";
                formAlert.textContent = data.message;
                if (data.status === "success") {
                    formAlert.className = "alert success";
                    cart = [];
                    updateCartUI();
                    checkoutForm.reset();
                } else {
                    formAlert.className = "alert error";
                }
            })
            .catch(() => {
                formAlert.style.display = "block";
                formAlert.className = "alert error";
                formAlert.textContent = "Erreur de réseau.";
            })
            .finally(() => {
                checkoutBtn.textContent = "Confirmer et Envoyer";
            });
        });
    }
});