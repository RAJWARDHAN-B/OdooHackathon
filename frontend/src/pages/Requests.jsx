import { useEffect, useState } from 'react';
import axios from 'axios';

function Requests() {
const [swaps, setSwaps] = useState([]);

useEffect(() => {
axios.get('http://localhost:5000/swaps').then(res => {
setSwaps(res.data);
});
}, []);

return (
<div>
<h2>Swap Requests</h2>
{swaps.map(s => (
<div key={s._id}>
{s.fromUser?.name} → {s.toUser?.name} [{s.status}]
</div>
))}
</div>
);
}

export default Requests