<script>
</script>

<body>
	<div class="app-container">
		<header>
			<a href="/">
				<h1>Baseball</h1>
			</a>
		</header>
		<main>
			<slot />
		</main>

		<footer>
			<p>Example footer here</p>
		</footer>
	</div>
</body>

<style lang="scss" global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

	body {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		color: #333333;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.app-container {
		background-color: #f7f7f7;
		display: flex;
		flex-direction: column;
	}

	header {
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: left;
		margin-inline: 2rem;
	}

	main {
		min-height: 40rem;
		padding: 5rem 10rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	footer {
		height: 5rem;
		display: flex;
		justify-content: left;
		align-items: flex-end;
		margin-inline: 2rem;
	}
</style>
