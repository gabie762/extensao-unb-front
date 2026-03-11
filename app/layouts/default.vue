<template>
    <div class="layout">
        <header class="topbar">
            <AppTopBar />
        </header>

        <main class="content">
            <slot />
        </main>
    </div>
</template>

<style scoped>
.layout {
    min-height: 100vh;
    background: #f8fafc;
}

.topbar {
    background: #0f172a;
    color: #fff;
    border-bottom: 1px solid #1e293b;
}

.content {
    width: 100%;
    max-width: 1540px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
}
</style>