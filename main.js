"use strict";

// Kahve kartlarını oluşturacak fonksiyon
function renderCoffee(coffee) {
    return `<div class="col-md-6 mb-4">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${coffee.name}</h5>
                <p class="card-text">${coffee.roast}</p>
            </div>
        </div>
    </div>`;
}

// Filtrelenmiş kahve öğelerini gösterecek fonksiyon
function renderCoffees(coffees) {
    let html = '';
    coffees.forEach(coffee => {
        html += renderCoffee(coffee);
    });
    return html;
}

// Tüm kahve öğeleri
const coffees = [
    { id: 1, name: 'Light City', roast: 'light' },
    { id: 2, name: 'Half City', roast: 'light' },
    { id: 3, name: 'Cinnamon', roast: 'light' },
    { id: 4, name: 'Colombian', roast: 'medium' },
    { id: 5, name: 'American', roast: 'medium' },
    { id: 6, name: 'Breakfast', roast: 'medium' },
    { id: 7, name: 'High', roast: 'dark' },
    { id: 8, name: 'Turkish', roast: 'medium' },
    { id: 9, name: 'New Orleans', roast: 'dark' },
    { id: 10, name: 'European', roast: 'dark' },
    { id: 11, name: 'Espresso', roast: 'dark' },
    { id: 12, name: 'Mocha', roast: 'dark' },
    { id: 13, name: 'Italian', roast: 'dark' },
    { id: 14, name: 'French', roast: 'dark' }
];

// Kahve kartlarını göster
document.getElementById('coffees').innerHTML = renderCoffees(coffees);
// Roast seçimini dinleme
document.getElementById('roast-selection').addEventListener('change', function() {
    const selectedRoast = this.value;
    let filteredCoffees;
    if (selectedRoast === 'all') {
        filteredCoffees = coffees;
    } else {
        filteredCoffees = coffees.filter(coffee => coffee.roast.toLowerCase() === selectedRoast.toLowerCase());
    }
    document.getElementById('coffees').innerHTML = renderCoffees(filteredCoffees);
});

// Caffe Name arama işlemini dinleme
document.getElementById('search').addEventListener('input', filterCoffees);

// Kahve adı filtreleme fonksiyonu
function filterCoffees() {
    const searchText = document.getElementById('search').value.toLowerCase();
    const filteredCoffees = coffees.filter(coffee =>
        coffee.name.toLowerCase().startsWith(searchText)
    );
    document.getElementById('coffees').innerHTML = renderCoffees(filteredCoffees);
}

// Yeni kahve ekleme işlemini dinleme
document.getElementById('add-coffee-btn').addEventListener('click', function() {
    const coffeeName = document.getElementById('new-coffee-name').value;
    const roastSelection = document.getElementById('new-roast-selection').value;
    
    if(coffeeName && roastSelection) {
        const newCoffee = { id: coffees.length + 1, name: coffeeName, roast: roastSelection };
        coffees.push(newCoffee);
        
        const selectedRoast = document.getElementById('roast-selection').value;
        let filteredCoffees;
        if (selectedRoast === 'all') {
            filteredCoffees = coffees;
        } else {
            filteredCoffees = coffees.filter(coffee => coffee.roast.toLowerCase() === selectedRoast.toLowerCase());
        }
        
        document.getElementById('coffees').innerHTML = renderCoffees(filteredCoffees);
        
        // Formu temizle
        document.getElementById('new-coffee-name').value = '';
        document.getElementById('new-roast-selection').value = 'light';
    }
});