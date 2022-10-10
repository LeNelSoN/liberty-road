import React from 'react'
import Map from './Map'

const PathCard = () => {
  return (
<div class="card m-5">
  <div class="row g-0">
    <div class="col-4">
    <Map thumbnail={true} />
    </div>
    <div class="col-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>  )
}

export default PathCard