<script lang="ts">
  import type { User } from "../types";
	import { Line } from 'svelte-chartjs';
  const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My Second dataset',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgba(184, 185, 210, .3)',
      borderColor: 'rgb(35, 26, 136)',
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};


  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';

  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

	export let user: User;
</script>

<div class="border rounded-lg p-4">
	<h2 class="text-lg font-semibold mb-2">{user.username}</h2>
	<ul>
		<li>Email: {user.email}</li>
		<li>UID: <a href="/users/{user.uid}">{user.uid}</a></li>
		<li>ID: {user.id}</li>
	</ul>

	<Line {data} options={{ responsive: true }} />
</div>