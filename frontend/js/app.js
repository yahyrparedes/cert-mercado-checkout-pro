// ADD SDK DE MP
const mercadopago = new MercadoPago('TEST-cdfc1cec-1735-4d0d-82c9-7d0132cdca14', {
    locale: 'es-PE' // es-AR
});

// Handle call to backend and generate preference.
document.getElementById("checkout-btn").addEventListener("click", function () {

    $('#checkout-btn').attr("disabled", true);

    const orderData = {
        title: document.getElementById("product-title").innerHTML,
        quantity: document.getElementById("quantity").value,
        description: document.getElementById("product-description").innerHTML,
        unit_price: document.getElementById("unit-price").innerHTML
    };

    fetch("http://localhost:8000/api/mp/preference/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (preference) {
            createCheckoutButton(preference.id);

            $(".shopping-cart").fadeOut(500);
            setTimeout(() => {
                $(".container_payment").show(500).fadeIn();
            }, 500);
        })
        .catch(function () {
            alert("Unexpected error");
            $('#checkout-btn').attr("disabled", false);
        });
});

// Create preference when click on checkout button
function createCheckoutButton(preferenceId) {
    // Initialize the checkout
    mercadopago.checkout({
        preference: {
            id: preferenceId
        },
        render: {
            container: '#button-checkout', // Class name where the payment button will be displayed
            label: 'Pay', // Change the payment button text (optional)
        }
    });
}

// Handle price update
function updatePrice() {
    let quantity = document.getElementById("quantity").value;
    let unitPrice = document.getElementById("unit-price").innerHTML;
    let amount = parseInt(unitPrice) * parseInt(quantity);

    document.getElementById("cart-total").innerHTML = "S/ " + amount;
    document.getElementById("summary-price").innerHTML = "S/ " + unitPrice;
    document.getElementById("summary-quantity").innerHTML = quantity;
    document.getElementById("summary-total").innerHTML = "S/ " + amount;
}

document.getElementById("quantity").addEventListener("change", updatePrice);
updatePrice();

// Go back
document.getElementById("go-back").addEventListener("click", function () {
    $(".container_payment").fadeOut(500);
    setTimeout(() => {
        $(".shopping-cart").show(500).fadeIn();
    }, 500);
    $('#checkout-btn').attr("disabled", false);
});