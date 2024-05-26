<div class="d-flex">
    <button class="toggle-btn" type="button">
        <i class="lni lni-grid-alt"></i>
    </button>
    <div class="sidebar-logo">
        <a href="/">Admin page</a>
    </div>
</div>
<ul class="sidebar-nav">
    <li class="sidebar-item">
        <a href="/" class="sidebar-link">
            <i class="bi bi-house-door"></i>
            <span>Home</span>
        </a>
    </li>
    <li class="sidebar-item">
        <a href="/product" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#auth"
            aria-expanded="false" aria-controls="auth">
            <i class="bi bi-shop-window"></i>
            <span> Products</span>
        </a>
        <ul id="auth" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li class="sidebar-item">
                <a href="/product_add" class="sidebar-link"> <i class="bi bi-plus-square-fill"></i>
                    Ajouter Product</a>
            </li>
            <li class="sidebar-item">
                <a href="/product" class="sidebar-link"> <i class="bi bi-list-task"></i>
                    List Product</a>
            </li>
        </ul>
    </li>
    <li class="sidebar-item">
        <a href="/categories" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse"
            data-bs-target="#categories" aria-expanded="false" aria-controls="categories">
            <i class="bi bi-stack"></i>
            <span>Categories</span>
        </a>
        <ul id="categories" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li class="sidebar-item">
                <a href="/categories_add" class="sidebar-link"> <i class="bi bi-plus-square-fill"></i>
                    Ajouter Catégorie</a>
            </li>
            <li class="sidebar-item">
                <a href="/categories" class="sidebar-link"> <i class="bi bi-list-task"></i>
                    List Catégorie</a>
            </li>
        </ul>
    </li>
    <li class="sidebar-item">
        <a href="/orders" class="sidebar-link collapsed has-dropdown" data-bs-toggle="collapse" data-bs-target="#orders"
            aria-expanded="false" aria-controls="orders">
            <i class="bi bi-bag"></i>
            <span>Orders</span>
        </a>
        <ul id="orders" class="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
            <li class="sidebar-item">
                <a href="/orders" class="sidebar-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-file-text">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                    </svg>
                    List Orders</a>
            </li>
            <li class="sidebar-item">
                <a href="/orders_confirme" class="sidebar-link">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20"fill="currentColor"
                        viewBox="0 0 24 24">
                        <path d="M9 7V2.221a2 2 0 0 0-.5.365L4.586 6.5a2 2 0 0 0-.365.5H9Z" />
                        <path fill-rule="evenodd"
                            d="M11 7V2h7a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9h5a2 2 0 0 0 2-2Zm4.707 5.707a1 1 0 0 0-1.414-1.414L11 14.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4Z"
                            clip-rule="evenodd" />
                    </svg> Ordes confirmed</a>
            </li>

        </ul>
    </li>
    <li class="sidebar-item">
        <a href="/fournisseur" class="sidebar-link">
            <i class="bi bi-person-down"></i>
            <span>Fournisseur</span>
        </a>
    </li>
    <li class="sidebar-item">
        <a href="/users" class="sidebar-link">
            <i class="lni lni-user"></i>
            <span>Users</span>
        </a>
    </li>
    <li class="sidebar-item">
        <a href="/update_password" class="sidebar-link">
            <i class="bi bi-pencil-square"></i> 
            <span>Update password</span>
        </a>
    </li>
    <li class="sidebar-item">
        <a href="/logout" class="sidebar-link">
            <i class="bi bi-box-arrow-in-left"></i>
            <span>logout</span>
        </a>
    </li>

</ul>
