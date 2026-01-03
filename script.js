// --- 1. HIERARCHY DATA (The User's Specific List) ---
const hierarchyData = {
    "Hardware": {
        "Plywood": {
            "Regular Plywood": ["1/4\" (4x8 ft)", "1/2\" (4x8 ft)", "3/4\" (4x8 ft)"],
            "Marine Plywood": ["1/2\" (4x8 ft)", "3/4\" (4x8 ft)"]
        },
        "Nails": {
            "Common Nails": ["1\"", "1.5\"", "2\"", "3\"", "4\""]
        },
        "Screws": {
            "Wood Screws": ["1/2\"", "1\"", "1.5\"", "2\"", "3\""],
            "Metal Screws": ["1/2\"", "3/4\"", "1\"", "1.5\""]
        },
        "Bolts": {
            "Hex Bolts": ["M6", "M8", "M10", "1/4\"", "3/8\"", "1/2\""]
        },
        "Nuts": {
            "Hex Nuts": ["M6", "M8", "M10"]
        },
        "Washers": {
            "Flat Washers": ["M6", "M8", "M10"]
        },
        "Hammer": {
            "Claw Hammer": ["8 oz", "12 oz", "16 oz"]
        },
        "Screwdrivers": {
            "Flat Screwdriver": ["Small", "Medium", "Large"],
            "Phillips Screwdriver": ["Small", "Medium", "Large"]
        },
        "Pliers": {
            "Combination Pliers": ["6\"", "7\"", "8\""],
            "Long-Nose Pliers": ["6\"", "8\""]
        },
        "Utility Knife": {
            "Retractable Knife": ["18 mm", "25 mm"]
        },
        "Measuring Tools": {
            "Tape Measure": ["3 m", "5 m", "7.5 m"]
        },
        "Adhesives": {
            "Wood Glue": ["125 ml", "250 ml", "500 ml"],
            "Epoxy / Resin": ["50 ml", "100 ml", "250 ml"]
        },
        "Sealants": {
            "Silicone Sealant": ["280 ml"]
        },
        "Paints": {
            "Enamel Paint": ["1/4 L", "1/2 L", "1 L"],
            "Marine Paint / Varnish": ["1/4 L", "1/2 L", "1 L"]
        },
        "Painting Tools": {
            "Paint Brush": ["1\"", "2\"", "3\"", "4\""],
            "Paint Roller": ["4\"", "7\"", "9\""]
        },
        "Ropes": {
            "Nylon Rope": ["6 mm", "8 mm", "10 mm"],
            "Polypropylene Rope": ["6 mm", "8 mm", "10 mm"]
        }
    },
    "Electrical": {
        "Cords": {
            "Extension Cord": ["5 m", "10 m", "15 m"]
        },
        "Insulation": {
            "Electrical Tape": ["18 mm x 10 m"]
        },
        "Cable Management": {
            "Cable Tie": ["4\"", "6\"", "8\"", "12\""]
        },
        "Switches": {
            "Light Switch": ["1-Gang", "2-Gang"]
        },
        "Outlets": {
            "Convenience Outlet": ["1-Gang", "2-Gang"]
        },
        "Lighting": {
            "LED Bulb": ["5 W", "7 W", "9 W", "12 W"],
            "Flashlight": ["Small", "Medium", "Large"],
            "Work Light": ["10 W", "20 W", "30 W"]
        }
    },
    "Fishing": {
        "Lines": {
            "Monofilament Line": ["0.25 mm", "0.30 mm", "0.35 mm"],
            "Braided Line": ["10 lb", "20 lb", "30 lb"]
        },
        "Hooks": {
            "Fishing Hook": ["Size #6", "Size #4", "Size #2", "Size 1/0"]
        },
        "Sinkers": {
            "Lead Sinker": ["10 g", "20 g", "30 g"]
        },
        "Nets": {
            "Fishing Net": ["Small", "Medium", "Large"]
        }
    },
    "Shared": {
        "Safety Gear": {
            "Work Gloves": ["Small", "Medium", "Large"],
            "Rubber Gloves": ["Small", "Medium", "Large"],
            "Safety Glasses": ["Standard"]
        },
        "Containers": {
            "Bucket": ["10 L", "15 L", "20 L"],
            "Plastic Container": ["1 L", "5 L", "10 L"]
        }
    }
};

// --- 2. SAMPLE INVENTORY DATA ---
let inventory = [
    { id: "H_Hammer_ClawHammer_16oz_Piece", name: "Claw Hammer", subCat: "Hammer", size: "16 oz", category: "Hardware", type: "Piece", qty: 5 },
    { id: "F_Hooks_FishingHook_Size1-0_Box", name: "Fishing Hook", subCat: "Hooks", size: "Size 1/0", category: "Fishing", type: "Box", qty: 10 }
];

// --- 3. PAGE NAVIGATION ---
function navigateToInventory(category) {
    document.getElementById('homePage').style.display = 'none';
    document.getElementById('inventoryPage').style.display = 'block';
    
    // Set the dropdown filter
    const filter = document.getElementById('categoryFilter');
    filter.value = category;
    renderTable();

    // Update Title
    document.getElementById('pageTitle').innerText = category === "All" ? "Inventory: All Items" : `Inventory: ${category}`;
}

function showHome() {
    document.getElementById('inventoryPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'block';
}

// --- 4. RENDER TABLE ---
function renderTable() {
    const tableBody = document.getElementById('inventoryTableBody');
    const categoryFilter = document.getElementById('categoryFilter').value;
    const searchText = document.getElementById('searchBar').value.toLowerCase();

    tableBody.innerHTML = ""; 

    const filteredData = inventory.filter(item => {
        const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
        const matchesSearch = item.name.toLowerCase().includes(searchText) 
                           || item.id.toLowerCase().includes(searchText)
                           || item.subCat.toLowerCase().includes(searchText);
        return matchesCategory && matchesSearch;
    });

    filteredData.forEach(item => {
        let statusBadge = '';
        if (item.qty === 0) statusBadge = '<span class="status-badge status-out">Out of Stock</span>';
        else if (item.qty < 5) statusBadge = '<span class="status-badge status-low">Low Stock</span>';
        else statusBadge = '<span class="status-badge status-good">In Stock</span>';
        
        // Show Convert Button only for Boxes/Bundles
        let convertBtn = '';
        if(['Box', 'Bundle', 'Set', 'Roll', 'Can'].includes(item.type)) {
             convertBtn = `<button class="btn-action" style="background-color: #8e44ad; margin-left:5px;" onclick="openConvertModal('${item.id}')">Unpack</button>`;
        }

        const row = `
            <tr>
                <td style="font-family: monospace; font-weight: bold; color: #555; font-size: 0.85em;">${item.id}</td>
                <td><strong>${item.name}</strong></td>
                <td>${item.subCat}</td>
                <td>${item.size}</td>
                <td>${item.type}</td>
                <td style="font-size: 1.1em;">${item.qty}</td>
                <td>${statusBadge}</td>
                <td>
                    <button class="btn-action" onclick="openStockModal('${item.id}')">Update</button>
                    ${convertBtn}
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// --- 5. CASCADING DROPDOWNS ---
function loadSubCategories() {
    const cat = document.getElementById('selCategory').value;
    const subCatSel = document.getElementById('selSubCat');
    const itemSel = document.getElementById('selItem');
    const sizeSel = document.getElementById('selSize');

    // Reset Dropdowns
    subCatSel.innerHTML = '<option value="">-- Select Sub-Category --</option>';
    itemSel.innerHTML = '<option value="">-- Select Category First --</option>';
    sizeSel.innerHTML = '<option value="">-- Select Item First --</option>';
    itemSel.disabled = true;
    sizeSel.disabled = true;

    if (cat && hierarchyData[cat]) {
        subCatSel.disabled = false;
        Object.keys(hierarchyData[cat]).forEach(sub => {
            subCatSel.innerHTML += `<option value="${sub}">${sub}</option>`;
        });
    } else {
        subCatSel.disabled = true;
    }
    updateIDPreview();
}

function loadItems() {
    const cat = document.getElementById('selCategory').value;
    const sub = document.getElementById('selSubCat').value;
    const itemSel = document.getElementById('selItem');
    const sizeSel = document.getElementById('selSize');

    itemSel.innerHTML = '<option value="">-- Select Item --</option>';
    sizeSel.innerHTML = '<option value="">-- Select Item First --</option>';
    sizeSel.disabled = true;

    if (cat && sub && hierarchyData[cat][sub]) {
        itemSel.disabled = false;
        Object.keys(hierarchyData[cat][sub]).forEach(itm => {
            itemSel.innerHTML += `<option value="${itm}">${itm}</option>`;
        });
    } else {
        itemSel.disabled = true;
    }
    updateIDPreview();
}

function loadSizes() {
    const cat = document.getElementById('selCategory').value;
    const sub = document.getElementById('selSubCat').value;
    const itm = document.getElementById('selItem').value;
    const sizeSel = document.getElementById('selSize');

    sizeSel.innerHTML = '<option value="">-- Select Size --</option>';

    if (cat && sub && itm && hierarchyData[cat][sub][itm]) {
        sizeSel.disabled = false;
        hierarchyData[cat][sub][itm].forEach(size => {
            sizeSel.innerHTML += `<option value="${size}">${size}</option>`;
        });
    } else {
        sizeSel.disabled = true;
    }
    updateIDPreview();
}

// --- 6. ID GENERATION & ADD PRODUCT ---
function cleanString(str) {
    // Removes spaces, /, ", and # to make a clean ID code
    return str.replace(/[\s\/"#]/g, '').replace(/\./g, '-');
}

function updateIDPreview() {
    const cat = document.getElementById('selCategory').value;
    const sub = document.getElementById('selSubCat').value;
    const item = document.getElementById('selItem').value;
    const size = document.getElementById('selSize').value;
    const unit = document.getElementById('selUnit').value;

    if (!cat || !sub || !item || !size) {
        document.getElementById('generatedID').value = "Complete selection...";
        return;
    }

    let prefix = cat.charAt(0); // H, F, E
    if(cat === "Shared") prefix = "S";

    const cleanSub = cleanString(sub);
    const cleanItem = cleanString(item);
    const cleanSize = cleanString(size);

    const finalID = `${prefix}_${cleanSub}_${cleanItem}_${cleanSize}_${unit}`;
    document.getElementById('generatedID').value = finalID;
}

function addNewProduct() {
    const id = document.getElementById('generatedID').value;
    const cat = document.getElementById('selCategory').value;
    const sub = document.getElementById('selSubCat').value;
    const item = document.getElementById('selItem').value;
    const size = document.getElementById('selSize').value;
    const unit = document.getElementById('selUnit').value;
    const qty = parseInt(document.getElementById('newItemQty').value);

    if (id.includes("Complete")) { alert("Please select all options."); return; }
    if (inventory.find(i => i.id === id)) { alert("ID already exists!"); return; }

    inventory.push({ id, name: item, subCat: sub, size: size, category: cat, type: unit, qty });
    
    closeModals();
    renderTable();
    alert("Product Added!");
}

// --- 7. STOCK & CONVERSION UTILITIES ---
function openStockModal(id) {
    const item = inventory.find(i => i.id === id);
    document.getElementById('stockItemName').innerText = item.name + " (" + item.size + ")";
    document.getElementById('stockItemId').value = item.id;
    document.getElementById('stockModal').style.display = 'block';
}

function saveStockUpdate() {
    const id = document.getElementById('stockItemId').value;
    const action = document.getElementById('stockAction').value;
    const qty = parseInt(document.getElementById('stockQty').value);
    
    if(isNaN(qty) || qty <= 0) return;
    const item = inventory.find(i => i.id === id);
    if(action === 'add') item.qty += qty;
    else item.qty = Math.max(0, item.qty - qty);

    closeModals();
    renderTable();
}

function openConvertModal(sourceID) {
    const sourceItem = inventory.find(i => i.id === sourceID);
    document.getElementById('convertSourceID').value = sourceID;
    document.getElementById('convertSourceName').innerText = `${sourceItem.name} ${sourceItem.size} (${sourceItem.type})`;
    
    const targetSelect = document.getElementById('convertTargetItem');
    targetSelect.innerHTML = "";
    
    // Find items in same SubCategory that are 'Piece' or similar
    const potentialTargets = inventory.filter(i => 
        i.subCat === sourceItem.subCat && 
        i.name === sourceItem.name &&
        i.id !== sourceItem.id &&
        ['Piece', 'Meter', 'Liter'].includes(i.type)
    );

    if(potentialTargets.length === 0) {
        alert("No compatible 'Piece' or 'Meter' item found to unpack into.");
        return;
    }

    potentialTargets.forEach(i => {
        targetSelect.innerHTML += `<option value="${i.id}">${i.size} - ${i.type} (Qty: ${i.qty})</option>`;
    });

    document.getElementById('convertModal').style.display = 'block';
}

function executeConversion() {
    const sId = document.getElementById('convertSourceID').value;
    const tId = document.getElementById('convertTargetItem').value;
    const openQty = parseInt(document.getElementById('convertQty').value);
    const ratio = parseInt(document.getElementById('convertRatio').value);

    const sItem = inventory.find(i => i.id === sId);
    const tItem = inventory.find(i => i.id === tId);

    if(sItem.qty < openQty) { alert("Not enough stock."); return; }

    sItem.qty -= openQty;
    tItem.qty += (openQty * ratio);

    closeModals();
    renderTable();
    alert("Stock Converted!");
}

function openAddModal() { 
    document.getElementById('addModal').style.display = 'block'; 
    // Reset dropdowns
    document.getElementById('selCategory').value = "";
    loadSubCategories(); 
}

function closeModals() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('stockModal').style.display = 'none';
    document.getElementById('convertModal').style.display = 'none';
}

// Initial Render (Load Home Page)
document.getElementById('homePage').style.display = 'block';
document.getElementById('inventoryPage').style.display = 'none';