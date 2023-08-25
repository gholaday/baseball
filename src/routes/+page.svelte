<script>
	export let data;
</script>

<div class="links-container">
	{#each data.teams as team}
		<a data-sveltekit-preload-data class="team-link" href="/{team.abbreviation}">
			<img src="/images/teams/{team.id}.png" alt="" />
			{team.shortName}
		</a>
	{/each}
</div>

<style lang="scss" scoped>
	.links-container {
		display: flex;
		flex-wrap: wrap;
		gap: 2rem;
		justify-content: center;
	}

	.team-link {
		display: flex;
		flex-direction: column;
		align-items: center;
		color: inherit;
		text-decoration: none;
		width: 5rem;

		& > img {
			width: 75px;
			height: 75px;

			filter: drop-shadow(5px 5px 5px #555555);
		}
	}
</style>
