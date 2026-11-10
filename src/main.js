import './style.css'
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'

const productUrl = 'https://www.melaleuca.com/productstore/supplements/florify-daily-probiotic'

document.querySelector('#app').innerHTML = `
  <a class="skip-link" href="#overview">Skip to product information</a>
  <header class="site-header">
    <a class="wordmark" href="#" aria-label="Florify home">Florify<span>®</span><small>VITALITY FOR LIFE</small></a>
    <nav aria-label="Product navigation"><a href="#overview">Overview</a><a href="#formula">The formula</a><a class="nav-shop" href="${productUrl}" target="_blank" rel="noopener noreferrer">Shop Florify <span aria-hidden="true">↗</span></a></nav>
  </header>
  <main>
    <section class="product-hero" id="overview" aria-labelledby="product-title">
      <div class="product-visual">
        <div class="visual-heading"><span>FLORIFY® DAILY PROBIOTIC</span><span>30 CAPSULES</span></div>
        <div id="scene" role="img" aria-label="Florify Daily Probiotic bottle on a sunlit kitchen counter. Drag left or right to rotate the bottle."></div>
        <div class="viewer-toolbar"><p><span aria-hidden="true">↔</span> Drag to explore</p><div class="controls"><button id="rotate" type="button" aria-pressed="false" aria-label="Toggle automatic bottle rotation">Auto rotate <span aria-hidden="true">↻</span></button><button id="reset" type="button">Reset view <span aria-hidden="true">↗</span></button></div></div>
        <p id="error" role="alert" hidden></p>
      </div>
      <div class="product-copy">
        <p class="eyebrow">A DAILY FOUNDATION FOR WELLNESS</p>
        <h1 id="product-title">Critical Immune &amp;<br><strong>Digestive Support</strong></h1>
        <p class="lead">Good health starts from within.</p>
        <p>Support your gut—and your everyday well-being—with Florify Daily Probiotic. A proprietary blend of beneficial bacteria helps maintain balance in your digestive tract while supporting immune health.*</p>
        <p>Each daily serving delivers <strong>11 billion active cultures</strong> across <strong>9 diverse probiotic strains</strong>, helping support digestion and nutrient absorption.*</p>
        <p>An acid-resistant capsule helps the probiotics reach the intestines, where they can thrive.*</p>
        <div class="product-actions"><a class="primary-button" href="${productUrl}" target="_blank" rel="noopener noreferrer">Discover Florify <span aria-hidden="true">↗</span></a><span class="product-size">30 capsules <span aria-hidden="true">·</span> One daily</span></div>
        <div class="product-qualities" aria-label="Product qualities"><span><i aria-hidden="true">✓</i> Vegetarian</span><span><i aria-hidden="true">✓</i> Gluten-free</span></div>
      </div>
    </section>
    <section class="formula" id="formula" aria-labelledby="formula-title">
      <div class="formula-heading"><p class="eyebrow">SMALL CAPSULE. EVERYDAY SUPPORT.</p><h2 id="formula-title">Thoughtfully formulated.<br>Simply part of your day.</h2></div>
      <div class="formula-details">
        <div class="formula-stats"><div><p class="stat-number">11<span>billion</span></p><p>Active cultures*</p></div><div><p class="stat-number">9</p><p>Diverse probiotic strains</p></div><div><p class="stat-number">1</p><p>Capsule daily</p></div></div>
        <p class="formula-description">A daily blend of probiotics and vitamin D for healthy immune and digestive systems.* Take one capsule daily, following the directions on your product packaging.</p>
        <a class="text-link" href="${productUrl}" target="_blank" rel="noopener noreferrer">Explore ingredients &amp; product details <span aria-hidden="true">↗</span></a>
      </div>
    </section>
  </main>
  <footer class="site-footer"><a class="footer-brand" href="#">Florify®<span>VITALITY FOR LIFE</span></a><div><p class="disclaimer">*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.</p><a href="${productUrl}" target="_blank" rel="noopener noreferrer">Product information from Melaleuca ↗</a></div></footer>
`

const container = document.querySelector('#scene')
let renderer
try {
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
} catch {
  const message = document.querySelector('#error')
  message.hidden = false
  message.textContent = 'The 3D view needs WebGL. Try a browser with hardware acceleration enabled.'
  document.querySelectorAll('button').forEach(button => { button.disabled = true })
}

if (renderer) {
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.0
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50)
  // Keep the photographed room's perspective fixed; turn the bottle itself.
  // A virtual studio supplies soft reflections on the plastic.
  const pmrem = new THREE.PMREMGenerator(renderer)
  const environment = new RoomEnvironment()
  const environmentMap = pmrem.fromScene(environment, 0.04)
  scene.environment = environmentMap.texture
  environment.dispose()
  pmrem.dispose()

  scene.add(new THREE.HemisphereLight(0xffffff, 0xa6a99c, 0.7))
  const keyLight = new THREE.DirectionalLight(0xffefd8, 2.3)
  keyLight.position.set(-3, 8, 5)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(2048, 2048)
  keyLight.shadow.camera.left = -3
  keyLight.shadow.camera.right = 3
  keyLight.shadow.camera.top = 5
  keyLight.shadow.camera.bottom = -3
  keyLight.shadow.normalBias = 0.025
  keyLight.shadow.bias = -0.0001
  keyLight.shadow.radius = 4
  scene.add(keyLight)
  const fill = new THREE.DirectionalLight(0xe5edf5, 0.8)
  fill.position.set(4, 3, -3)
  scene.add(fill)

  const bottle = new THREE.Group()
  scene.add(bottle)
  const plastic = new THREE.MeshStandardMaterial({ color: 0xf8f6f1, roughness: 0.32, metalness: 0, envMapIntensity: 0.45 })
  const capMaterial = new THREE.MeshStandardMaterial({ color: 0xfaf9f5, roughness: 0.43, metalness: 0, envMapIntensity: 0.35 })

  // Radius and height pairs describe a closed bottle silhouette.
  // LatheGeometry revolves this profile around the vertical axis.
  const outline = [
    [0, 0.06], [0.64, 0.06], [0.76, 0.075], [0.83, 0.12],
    [0.875, 0.20], [0.89, 0.30], [0.89, 0.48], [0.89, 0.9], [0.89, 1.4], [0.89, 1.95], [0.89, 2.15], [0.88, 2.26],
    [0.845, 2.37], [0.78, 2.47], [0.67, 2.55], [0.64, 2.62],
    [0.64, 2.78], [0, 2.78],
  ]
  // Round each corner while retaining the straight sides of the bottle.
  const curve = new THREE.CatmullRomCurve3(outline.map(([radius, height]) => new THREE.Vector3(radius, height, 0)), false, 'centripetal')
  const profile = curve.getPoints(180).map(point => new THREE.Vector2(Math.max(0, point.x), point.y))
  const body = new THREE.Mesh(new THREE.LatheGeometry(profile, 128), plastic)
  body.castShadow = true
  body.receiveShadow = true
  bottle.add(body)

  // Follow the actual bottle profile so the printed sleeve never intersects it.
  const labelBottom = 0.23
  const labelTop = 2.13
  const labelProfile = profile.filter(point => point.y >= labelBottom && point.y <= labelTop)
    .map(point => new THREE.Vector2(point.x + 0.004, point.y))
  const labelGeometry = new THREE.LatheGeometry(labelProfile, 192)
  const labelUV = labelGeometry.attributes.uv
  const labelPositions = labelGeometry.attributes.position
  for (let i = 0; i < labelUV.count; i++) {
    labelUV.setY(i, (labelPositions.getY(i) - labelBottom) / (labelTop - labelBottom))
  }
  const labelTexture = new THREE.TextureLoader().load('/artwork/florify-label.svg', undefined, undefined, () => {
    const message = document.querySelector('#error')
    message.hidden = false
    message.textContent = 'The label artwork could not be loaded. Refresh to try again.'
  })
  labelTexture.colorSpace = THREE.SRGBColorSpace
  labelTexture.anisotropy = renderer.capabilities.getMaxAnisotropy()
  const labelMaterial = new THREE.MeshStandardMaterial({ map: labelTexture, color: 0xd5d5d5, roughness: 0.72, metalness: 0, envMapIntensity: 0.08 })
  const label = new THREE.Mesh(labelGeometry, labelMaterial)
  // Put the middle of the flat artwork toward the initial camera position.
  label.rotation.y = Math.atan2(3.6, 7) - Math.PI
  label.castShadow = true
  bottle.add(label)

  function cylinder(radius, height, y, material) {
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, height, 128), material)
    mesh.position.y = y
    mesh.castShadow = true
    mesh.receiveShadow = true
    bottle.add(mesh)
    return mesh
  }
  cylinder(0.735, 0.105, 2.69, plastic) // Neck collar beneath the cap.
  cylinder(0.78, 0.44, 3.00, capMaterial)

  function roundedRim(radius, tube, y) {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(radius, tube, 12, 128), capMaterial)
    rim.rotation.x = Math.PI / 2
    rim.position.y = y
    rim.castShadow = true
    bottle.add(rim)
  }
  roundedRim(0.755, 0.027, 3.22)
  roundedRim(0.765, 0.022, 2.78)

  // Instancing keeps the cap's fine grip ridges in a single draw call.
  const ridgeCount = 100
  const ridges = new THREE.InstancedMesh(new THREE.BoxGeometry(0.013, 0.38, 0.016), capMaterial, ridgeCount)
  const placement = new THREE.Object3D()
  for (let i = 0; i < ridgeCount; i++) {
    const angle = i / ridgeCount * Math.PI * 2
    placement.position.set(Math.sin(angle) * 0.784, 3.00, Math.cos(angle) * 0.784)
    placement.rotation.y = angle
    placement.updateMatrix()
    ridges.setMatrixAt(i, placement.matrix)
  }
  ridges.castShadow = true
  bottle.add(ridges)

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: 0 }))
  ground.rotation.x = -Math.PI / 2
  ground.position.y = 0.057
  ground.receiveShadow = true
  scene.add(ground)

  // A feathered contact shadow joins the bottle base to the photographed stone.
  const contactCanvas = document.createElement('canvas')
  contactCanvas.width = contactCanvas.height = 128
  const contactContext = contactCanvas.getContext('2d')
  const contactGradient = contactContext.createRadialGradient(64, 64, 12, 64, 64, 64)
  contactGradient.addColorStop(0, 'rgba(65, 43, 23, 0.30)')
  contactGradient.addColorStop(0.55, 'rgba(65, 43, 23, 0.15)')
  contactGradient.addColorStop(1, 'rgba(65, 43, 23, 0)')
  contactContext.fillStyle = contactGradient
  contactContext.fillRect(0, 0, 128, 128)
  const contactTexture = new THREE.CanvasTexture(contactCanvas)
  const contactShadow = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 2.2), new THREE.MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, toneMapped: false }))
  contactShadow.rotation.x = -Math.PI / 2
  contactShadow.position.y = 0.058
  scene.add(contactShadow)


  const rotateButton = document.querySelector('#rotate')
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  let automaticMotion = !motionPreference.matches
  let motionTime = 0
  let motionOrigin = 0
  let lastFrameTime = performance.now()

  function setAutomaticMotion(enabled) {
    automaticMotion = enabled
    motionTime = 0
    motionOrigin = bottle.rotation.y
    rotateButton.setAttribute('aria-pressed', String(enabled))
    rotateButton.innerHTML = `${enabled ? 'Pause motion' : 'Auto rotate'} <span aria-hidden="true">${enabled ? 'Ⅱ' : '↻'}</span>`
  }
  function stopAutomaticMotion() {
    if (automaticMotion) setAutomaticMotion(false)
  }
  function resetView() {
    camera.position.set(3.1, 2.54, 6.02)
    camera.lookAt(0, 1.55, 0)
    bottle.rotation.y = 0
  }
  resetView()
  setAutomaticMotion(automaticMotion)
  rotateButton.addEventListener('click', () => setAutomaticMotion(!automaticMotion))
  document.querySelector('#reset').addEventListener('click', () => {
    stopAutomaticMotion()
    resetView()
  })
  let draggingPointer = null
  let previousPointerX = 0
  function startDrag(event) {
    if (draggingPointer !== null || (event.pointerType === 'mouse' && event.button !== 0)) return
    stopAutomaticMotion()
    draggingPointer = event.pointerId
    previousPointerX = event.clientX
    renderer.domElement.setPointerCapture(event.pointerId)
  }
  function moveDrag(event) {
    if (event.pointerId !== draggingPointer) return
    bottle.rotation.y += (event.clientX - previousPointerX) * 0.008
    previousPointerX = event.clientX
  }
  function endDrag(event) {
    if (event.pointerId !== draggingPointer) return
    draggingPointer = null
    if (renderer.domElement.hasPointerCapture(event.pointerId)) renderer.domElement.releasePointerCapture(event.pointerId)
  }
  renderer.domElement.addEventListener('pointerdown', startDrag)
  renderer.domElement.addEventListener('pointermove', moveDrag)
  renderer.domElement.addEventListener('pointerup', endDrag)
  renderer.domElement.addEventListener('pointercancel', endDrag)
  renderer.domElement.addEventListener('lostpointercapture', endDrag)
  renderer.domElement.addEventListener('wheel', stopAutomaticMotion, { passive: true })
  function handleMotionPreference(event) {
    if (event.matches) stopAutomaticMotion()
  }
  motionPreference.addEventListener('change', handleMotionPreference)

  const resizeObserver = new ResizeObserver(() => {
    const { width, height } = container.getBoundingClientRect()
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  })
  resizeObserver.observe(container)
  renderer.setAnimationLoop(() => {
    const now = performance.now()
    const delta = Math.min((now - lastFrameTime) / 1000, 0.05)
    lastFrameTime = now
    if (automaticMotion) {
      motionTime += delta
      bottle.rotation.y = motionOrigin + Math.sin(motionTime * 0.25) * 0.22
    }
    renderer.render(scene, camera)
  })

  // Release GPU resources and listeners when Vite replaces this module.
  if (import.meta.hot) import.meta.hot.dispose(() => {
    renderer.setAnimationLoop(null)
    resizeObserver.disconnect()
    renderer.domElement.removeEventListener('pointerdown', startDrag)
    renderer.domElement.removeEventListener('pointermove', moveDrag)
    renderer.domElement.removeEventListener('pointerup', endDrag)
    renderer.domElement.removeEventListener('pointercancel', endDrag)
    renderer.domElement.removeEventListener('lostpointercapture', endDrag)
    renderer.domElement.removeEventListener('wheel', stopAutomaticMotion)
    motionPreference.removeEventListener('change', handleMotionPreference)
    scene.traverse(object => {
      object.geometry?.dispose()
      if (object.material) object.material.dispose()
    })
    contactTexture.dispose()
    labelTexture.dispose()
    environmentMap.dispose()
    renderer.dispose()
  })
}
