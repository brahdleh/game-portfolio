'use client'

import React, { useEffect, useRef } from 'react'

class Platform {
  x: number
  y: number
  width: number
  height: number

  constructor(x: number, y: number, width: number, height: number) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  draw(ctx: CanvasRenderingContext2D, scrollY: number, scale: number) {
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x * scale, (this.y - scrollY) * scale, this.width * scale, this.height * scale)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2 * scale
    ctx.strokeRect(this.x * scale, (this.y - scrollY) * scale, this.width * scale, this.height * scale)
  }
}

class Player {
  x: number
  y: number
  width: number
  height: number
  velocityY: number
  isJumping: boolean
  groundedPlatform: Platform | null
  absoluteY: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.width = 20
    this.height = 40
    this.velocityY = 0
    this.isJumping = false
    this.groundedPlatform = null
    this.absoluteY = y
  }

  update(platforms: Platform[], scale: number) {
    // Apply gravity
    this.velocityY += 0.4 * scale

    // Terminal velocity
    const maxFallSpeed = 12 * scale
    if (this.velocityY > maxFallSpeed) {
      this.velocityY = maxFallSpeed
    }

    // Apply vertical movement
    this.y += this.velocityY

    // Update absolute position
    this.absoluteY += this.velocityY

    // Calculate rendered position based on scroll
    this.y = this.absoluteY - window.scrollY

    this.groundedPlatform = null

    // Check for collision with platforms
    for (const platform of platforms) {
      if (
        this.x < platform.x + platform.width &&
        this.x + this.width > platform.x &&
        this.absoluteY < platform.y + platform.height &&
        this.absoluteY + this.height > platform.y
      ) {
        // Collision from above
        if (
          this.velocityY > 0 &&
          this.absoluteY + this.height - this.velocityY <= platform.y
        ) {
          this.absoluteY = platform.y - this.height
          this.y = this.absoluteY - window.scrollY
          this.velocityY = 0
          this.isJumping = false
          this.groundedPlatform = platform
        }
        // Collision from below
        else if (
          this.velocityY < 0 &&
          this.absoluteY - this.velocityY >= platform.y + platform.height
        ) {
          this.absoluteY = platform.y + platform.height
          this.y = this.absoluteY - window.scrollY
          this.velocityY = 0
        }
      }
    }
  }

  jump(scale: number) {
    if (!this.isJumping && this.groundedPlatform) {
      this.velocityY = -16 * scale
      this.isJumping = true
    }
  }

  moveLeft(scale: number) {
    this.x -= 4 * scale // move speed
  }

  moveRight(scale: number) {
    this.x += 4 * scale // move speed
  }

  draw(ctx: CanvasRenderingContext2D, scale: number) {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x * scale, this.y * scale, this.width * scale, this.height * scale)
  }

  reset(initialX: number, initialY: number) {
    this.x = initialX
    this.absoluteY = initialY
    this.y = this.absoluteY - window.scrollY
    this.velocityY = 0
    this.isJumping = false
    this.groundedPlatform = null
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerRef = useRef<Player | null>(null)
  const platformsRef = useRef<Platform[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})
  const animationFrameId = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Handle high-DPI screens
    const devicePixelRatio = window.devicePixelRatio || 1

    // Function to set canvas size
    function setCanvasSize() {
      canvas!.width = window.innerWidth * devicePixelRatio
      canvas!.height = window.innerHeight * devicePixelRatio
      canvas!.style.width = `${window.innerWidth}px`
      canvas!.style.height = `${window.innerHeight}px`
      ctx!.scale(devicePixelRatio, devicePixelRatio)
    }

    // Initial canvas size
    setCanvasSize()

    // Update canvas size on resize
    window.addEventListener('resize', setCanvasSize)

    // Prevent space and arrow keys from scrolling
    const preventDefault = (e: KeyboardEvent) => {
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault()
      }
    }
    window.addEventListener('keydown', preventDefault)

    // Initialize player
    const initialPlayerX = 50
    const initialPlayerY = 50
    playerRef.current = new Player(initialPlayerX, initialPlayerY)

    // Initialize platforms
    const platformWidth = window.innerWidth/6
    const platformHeight = 4
    const platformGap = 150
    let isLeft = true
    platformsRef.current = []

    const totalHeight = 2000 // Define a fixed total height for the game area
    const numPlatforms = Math.ceil(totalHeight / platformGap)

    for (let i = 0; i < numPlatforms; i++) {
      const x = isLeft ? 0 : window.innerWidth - platformWidth
      const y = 300 + i * platformGap
      platformsRef.current.push(new Platform(x, y, platformWidth, platformHeight))
      isLeft = !isLeft
    }

    // Reset player position
    function resetPlayer() {
      if (!playerRef.current) return

      playerRef.current.reset(initialPlayerX, initialPlayerY)
      window.scrollTo({
        top: playerRef.current.absoluteY - window.innerHeight / 2,
        behavior: 'instant'
      })
    }

    // Game loop
    function gameLoop() {
      if (!ctx || !canvas) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scale = 1 // Adjust scale if necessary

      if (playerRef.current) {
        // Handle input
        if (keysRef.current['a'] || keysRef.current['ArrowLeft']) {
          playerRef.current.moveLeft(scale)
        }
        if (keysRef.current['d'] || keysRef.current['ArrowRight']) {
          playerRef.current.moveRight(scale)
        }
        if (keysRef.current[' ']) {
          playerRef.current.jump(scale)
        }

        // Update player
        playerRef.current.update(platformsRef.current, scale)

        // Center-focused scrolling using absolute position
        const idealScrollY = playerRef.current.absoluteY - window.innerHeight / 2
        const minScroll = 0
        const maxScroll = totalHeight - window.innerHeight
        const targetScrollY = Math.max(minScroll, Math.min(maxScroll, idealScrollY))

        window.scrollTo({
          top: targetScrollY,
          behavior: 'instant'
        })

        // Check if player is out of bounds
        if (
          playerRef.current.absoluteY > totalHeight ||
          playerRef.current.x < 0 ||
          playerRef.current.x + playerRef.current.width > window.innerWidth
        ) {
          resetPlayer()
        }

        // Draw player
        playerRef.current.draw(ctx, scale)
      }

      // Draw platforms
      const currentScrollY = window.scrollY
      for (const platform of platformsRef.current) {
        platform.draw(ctx, currentScrollY, 1)
      }

      animationFrameId.current = requestAnimationFrame(gameLoop)
    }

    // Start the game loop
    resetPlayer()
    gameLoop()

    // Event listeners for keyboard input
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', setCanvasSize)
      window.removeEventListener('keydown', preventDefault)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        touchAction: 'none',
      }}
    />
  )
}

export default InteractiveBackground
