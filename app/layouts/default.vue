<template>
    <div class="layout">
        <AppTopBar />

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

.content {
    width: 100%;
    max-width: 1540px;
    margin: 0 auto;
    padding: 1.5rem 2rem;
    box-sizing: border-box;
}
</style>