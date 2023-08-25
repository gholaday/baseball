<script>
	export let data;
</script>

<body>
	<div class="app-container">
		<header>
			<a href="/">
				<h1>GoodSeason</h1>
			</a>
		</header>
		<main>
			<slot />
		</main>

		<footer>
			<p>
				Last updated on {data.last_uploaded}
			</p>
		</footer>
	</div>
</body>

<style lang="scss" global>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

	:root {
		--color: #333333;
		--background-color: #f5f5f5;
		--header-background-color: #f5f5f5;
	}

	body {
		margin: 0;
		font-family: 'Open Sans', sans-serif;
		color: var(--color);
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.app-container {
		background-color: var(--background-color);
		display: flex;
		flex-direction: column;
	}

	header {
		height: 5rem;
		display: flex;
		align-items: center;
		justify-content: left;
		padding-inline: 2rem;
		box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.75);
		background-color: var(--header-background-color);
	}

	main {
		min-height: 40rem;
		padding: 2rem 10rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: flex-start;
		gap: 2rem;
	}

	footer {
		display: flex;
		justify-content: left;
		align-items: flex-end;
		padding-inline: 2rem;
		font-size: 0.75rem;
		box-shadow: 0px -2px 5px 0px rgba(0, 0, 0, 0.75);
		background-color: var(--header-background-color);
	}
</style>
