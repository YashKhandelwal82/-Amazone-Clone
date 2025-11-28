document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
        {id:1,name:'Wireless Noise-Cancelling Headphones',price:129.99,img:'https://images.unsplash.com/photo-1518444021413-9a8d4a2d6d59?auto=format&fit=crop&w=1400&q=80'},
        {id:2,name:'Smartphone with AMOLED Display',price:599.99,img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1400&q=80'},
        {id:3,name:'Compact Espresso Machine',price:89.99,img:'https://images.unsplash.com/photo-1508505881226-9a2f2b3b4f7f?auto=format&fit=crop&w=1400&q=80'},
        {id:4,name:'Fitness Tracker Watch',price:49.99,img:'https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=1400&q=80'},
        {id:5,name:'4K Action Camera',price:149.99,img:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80'},
        {id:6,name:'Soft Throw Blanket',price:24.99,img:'https://images.unsplash.com/photo-1582582494700-7a3a1b2b0b7e?auto=format&fit=crop&w=1400&q=80'}
    ];

    const grid = document.getElementById('productGrid');
    const cartCount = document.getElementById('cartCount');
    const toast = document.getElementById('toast');
    let count = 0;

    function renderProducts(list = products){
        grid.innerHTML = list.map(p=>`
            <article class="product" data-id="${p.id}">
                <img src="${p.img}" alt="${p.name}" />
                <div class="prod-title">${p.name}</div>
                <div class="prod-price">$${p.price.toFixed(2)}</div>
                <div class="prod-actions">
                    <button class="btn" data-action="add">Add to cart</button>
                    <button class="btn secondary" data-action="details">Details</button>
                </div>
            </article>
        `).join('');
    }

    function showToast(msg){
        toast.textContent = msg;
        toast.style.display = 'block';
        setTimeout(()=> toast.style.display = 'none', 1800);
    }

    document.addEventListener('click', (e)=>{
        const actionBtn = e.target.closest('[data-action]');
        if(!actionBtn) return;
        const action = actionBtn.getAttribute('data-action');
        const productEl = actionBtn.closest('.product');
        const id = productEl && productEl.getAttribute('data-id');
        const product = products.find(p=>String(p.id)===String(id));

        if(action === 'add'){
            count++;
            cartCount.textContent = count;
            showToast(`${product.name} added to cart`);
        }
        if(action === 'details'){
            alert(product.name + '\n\nPrice: $' + product.price.toFixed(2));
        }
    });

    // simple search filter
    document.getElementById('searchBtn').addEventListener('click', ()=>{
        const q = document.getElementById('searchInput').value.trim().toLowerCase();
        if(!q){ renderProducts(); return; }
        const filtered = products.filter(p=>p.name.toLowerCase().includes(q));
        if(filtered.length) renderProducts(filtered);
        else grid.innerHTML = '<div style="padding:20px;background:#fff;border-radius:8px">No results</div>';
    });

    // initial render
    renderProducts();
});
