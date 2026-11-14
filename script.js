// ============================================
// DHIMAN MOTOHUB - COMPLETE JAVASCRIPT
// ============================================


// ============================================
// 1. BIKE DATA
// ============================================

const bikes = [

    {
        name: "Yamaha YZF-R15 V4",
        category: "Super Sport",
        price: 185000,
        engine: "155cc",
        power: "18.4 PS",
        image: "https://cdn.bikedekho.com/processedimages/yamaha/r15-v4/source/r15-v468bbb5acaa58a.jpg"
    },

    {
        name: "Kawasaki Ninja 300",
        category: "Super Sport",
        price: 340000,
        engine: "296cc",
        power: "39 PS",
        image: "https://asset.autocarindia.com/static/image-galleries/images/20260130_230025_56c36d09.jpg"
    },

    {
        name: "KTM RC 390",
        category: "Super Sport",
        price: 320000,
        engine: "373cc",
        power: "43.5 PS",
        image: "https://media.indulgexpress.com/indulgexpress/2024-03/fc2a2b95-4dae-4c2d-86dc-d8e7adf1a2fc/KTM_RC_390_1.jpg?auto=format%2Ccompress&enlarge=true&fit=max&h=675&w=1200"
    },

    {
        name: "BMW G 310 R",
        category: "Street Sport",
        price: 285000,
        engine: "313cc",
        power: "34 PS",
        image: "https://www.motorrad-bilder.at/slideshows/291/019476/P90407656-highRes.jpg"
    },

    {
        name: "Suzuki Gixxer SF",
        category: "Super Sport",
        price: 145000,
        engine: "155cc",
        power: "13.6 PS",
        image: "https://cdn.suzukimotorcycle.co.in/public-live/uploads/color-images/original/Gixxer-sfMet-Triton-Blue-Pearl-Glacier-White.jpg"
    },

    {
        name: "KTM 390 Adventure",
        category: "Adventure",
        price: 365000,
        engine: "399cc",
        power: "46 PS",
        image: "https://cdn.shopify.com/s/files/1/0511/7820/9461/files/556924_MY24_KTM-390-Adventure_WHITE_Front-Left_EU__Global_2024_KTM_390_ADVENTURE.jpg?v=1742573283"
    }

];


// ============================================
// 2. GLOBAL VARIABLES
// ============================================

const $ = id => document.getElementById(id);

const money = price =>
    "₹" + price.toLocaleString("en-IN");

let cart = JSON.parse(
    localStorage.getItem("dmh_cart") || "[]"
);

let lastOrder = null;


// ============================================
// 3. SAVE CART
// ============================================

function saveCart() {

    localStorage.setItem(
        "dmh_cart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


// ============================================
// 4. UPDATE CART COUNT
// ============================================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.qty,
        0
    );

    $("cartCount").textContent = count;

}


// ============================================
// 5. DISPLAY BIKES
// ============================================

function renderBikes() {

    const search = $("searchInput")
        .value.trim().toLowerCase();

    const category = $("categoryFilter").value;

    const sort = $("sortFilter").value;


    let list = bikes.filter(bike =>

        bike.name.toLowerCase().includes(search) &&

        (
            category === "all" ||
            bike.category === category
        )

    );


    // Sort by price

    if (sort === "low") {

        list.sort(
            (a, b) => a.price - b.price
        );

    }

    if (sort === "high") {

        list.sort(
            (a, b) => b.price - a.price
        );

    }


    // Display bike cards

    $("bikeGrid").innerHTML = list.length

        ? list.map(bike => `

            <article class="bike-card">

                <img
                    src="${bike.image}"
                    alt="${bike.name}"
                    loading="lazy"
                    onerror="this.src='https://placehold.co/600x400?text=Bike+Image'"
                >

                <div class="card-content">

                    <div class="tag">
                        ${bike.category}
                    </div>

                    <h3>${bike.name}</h3>

                    <div class="specs">
                        ${bike.engine} · ${bike.power}
                    </div>

                    <div class="price">
                        ${money(bike.price)}
                    </div>

                    <button
                        onclick="addToCart('${bike.name}')"
                    >
                        Add to Cart
                    </button>

                </div>

            </article>

        `).join("")

        : '<p class="empty">No bikes found.</p>';

}


// ============================================
// 6. ADD TO CART
// ============================================

function addToCart(name) {

    const item = cart.find(
        bike => bike.name === name
    );


    if (item) {

        item.qty++;

    }

    else {

        cart.push({

            name: name,

            qty: 1

        });

    }


    saveCart();

    alert(name + " added to your cart!");

}


// ============================================
// 7. MODAL FUNCTIONS
// ============================================

function showModal(id) {

    $(id).classList.add("show");

    $(id).setAttribute(
        "aria-hidden",
        "false"
    );

}


function closeModals() {

    document.querySelectorAll(".modal").forEach(modal => {

        modal.classList.remove("show");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

    });

}


// ============================================
// 8. OPEN SHOPPING CART
// ============================================

function openCart() {

    const box = $("cartItems");


    if (cart.length === 0) {

        box.innerHTML = `
            <p class="empty">
                Your cart is empty.
            </p>
        `;

        $("cartTotal").textContent = "";

        $("checkoutButton").disabled = true;

    }

    else {

        box.innerHTML = cart.map(item => {

            const bike = bikes.find(
                b => b.name === item.name
            );

            return `

                <div class="cart-row">

                    <div>

                        ${bike.name}

                        <br>

                        <strong>
                            ${money(bike.price * item.qty)}
                        </strong>

                    </div>

                    <div class="qty">

                        <button
                            onclick="changeQty('${bike.name}',-1)"
                        >
                            −
                        </button>

                        ${item.qty}

                        <button
                            onclick="changeQty('${bike.name}',1)"
                        >
                            +
                        </button>

                        <button
                            onclick="removeItem('${bike.name}')"
                        >
                            ×
                        </button>

                    </div>

                </div>

            `;

        }).join("");


        const total = cart.reduce(

            (sum, item) => {

                const bike = bikes.find(
                    b => b.name === item.name
                );

                return sum + bike.price * item.qty;

            },

            0

        );


        $("cartTotal").textContent =
            "Estimated Total: " + money(total);


        $("checkoutButton").disabled = false;

    }


    showModal("cartModal");

}


// ============================================
// 9. CHANGE QUANTITY
// ============================================

function changeQty(name, change) {

    const item = cart.find(
        x => x.name === name
    );

    if (!item) return;


    item.qty += change;


    if (item.qty <= 0) {

        cart = cart.filter(
            x => x.name !== name
        );

    }


    saveCart();

    openCart();

}


// ============================================
// 10. REMOVE CART ITEM
// ============================================

function removeItem(name) {

    cart = cart.filter(
        item => item.name !== name
    );

    saveCart();

    openCart();

}


// ============================================
// 11. CHECKOUT
// ============================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    closeModals();


    const total = cart.reduce(

        (sum, item) => {

            const bike = bikes.find(
                b => b.name === item.name
            );

            return sum + bike.price * item.qty;

        },

        0

    );


    $("checkoutSummary").textContent =

        "Selected Items: " +

        cart.map(
            item => item.name + " × " + item.qty
        ).join(", ") +

        " | Estimated Total: " +

        money(total);


    showModal("checkoutModal");

}


// ============================================
// 12. PLACE ORDER / SUBMIT ENQUIRY
// ============================================

function submitEnquiry(event) {

    event.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    const items = cart.map(
        item => ({ ...item })
    );


    const total = items.reduce(

        (sum, item) => {

            const bike = bikes.find(
                b => b.name === item.name
            );

            return sum + bike.price * item.qty;

        },

        0

    );


    // Generate unique order reference

    const orderID =

        "DMH-" +

        Date.now().toString(36).toUpperCase();


    // Customer information

    lastOrder = {

        id: orderID,

        name: $("customerName").value.trim(),

        email: $("customerEmail").value.trim(),

        phone: $("customerPhone").value.trim(),

        address: $("customerAddress").value.trim(),

        items: items,

        total: total,

        status: "Enquiry Received",

        date: new Date().toLocaleString("en-IN")

    };


    // Save order in browser

    const orders = JSON.parse(

        localStorage.getItem("dmh_orders") || "[]"

    );


    orders.unshift(lastOrder);


    localStorage.setItem(

        "dmh_orders",

        JSON.stringify(orders)

    );


    // Empty cart

    cart = [];

    saveCart();


    closeModals();


    // Show confirmation

    $("confirmationId").textContent = orderID;


    $("confirmationText").textContent =

        "Thank you " +

        lastOrder.name +

        "! Your purchase enquiry has been recorded in this browser.";


    // Generate confirmation link

    const confirmationURL =

        location.href.split("#")[0] +

        "#order=" +

        encodeURIComponent(orderID);


    // Copy confirmation link

    $("copyConfirmation").onclick = async function () {

        try {

            await navigator.clipboard.writeText(
                confirmationURL
            );

            alert("Confirmation link copied successfully!");

        }

        catch (error) {

            prompt(
                "Copy your confirmation link:",
                confirmationURL
            );

        }

    };


    // Create email draft

    const subject = encodeURIComponent(

        "Dhiman MotoHub Order Enquiry - " + orderID

    );


    const body = encodeURIComponent(

        "ORDER REFERENCE: " + orderID +

        "\n\nCustomer: " + lastOrder.name +

        "\nEmail: " + lastOrder.email +

        "\nPhone: " + lastOrder.phone +

        "\nAddress: " + lastOrder.address +

        "\n\nItems: " +

        items.map(
            item => item.name + " × " + item.qty
        ).join(", ") +

        "\n\nEstimated Total: " + money(total)

    );


    $("emailEnquiry").href =

        "mailto:dhimanmotohub@gmail.com" +

        "?subject=" + subject +

        "&body=" + body;


    showModal("confirmationModal");

}


// ============================================
// 13. CLOSE BUTTONS
// ============================================

document.querySelectorAll("[data-close]").forEach(button => {

    button.addEventListener(
        "click",
        closeModals
    );

});


// Close modal by clicking outside

document.querySelectorAll(".modal").forEach(modal => {

    modal.addEventListener("click", event => {

        if (event.target === modal) {

            closeModals();

        }

    });

});


// ============================================
// 14. EVENT LISTENERS
// ============================================

$("searchInput").addEventListener(
    "input",
    renderBikes
);


$("categoryFilter").addEventListener(
    "change",
    renderBikes
);


$("sortFilter").addEventListener(
    "change",
    renderBikes
);


$("openCart").addEventListener(
    "click",
    openCart
);


$("checkoutButton").addEventListener(
    "click",
    checkout
);


$("checkoutForm").addEventListener(
    "submit",
    submitEnquiry
);


// ============================================
// 15. INITIALIZE WEBSITE
// ============================================

renderBikes();

updateCartCount();


// ============================================
// END OF DHIMAN MOTOHUB JAVASCRIPT
// ============================================
