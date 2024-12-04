'use client'

import React, { useEffect, useRef } from 'react'

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

  update(platforms: Platform[]) {
    // Apply gravity
    this.velocityY += 0.4
    
    // Terminal velocity
    const maxFallSpeed = 10
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
        if (this.x < platform.x + platform.width &&
            this.x + this.width > platform.x &&
            this.absoluteY < platform.y + platform.height &&
            this.absoluteY + this.height > platform.y) {
            
          // Collision from above
          if (this.velocityY > 0 && this.absoluteY + this.height - this.velocityY <= platform.y) {
            this.absoluteY = platform.y - this.height
            this.y = this.absoluteY - window.scrollY
            this.velocityY = 0
            this.isJumping = false
            this.groundedPlatform = platform
          }
          // Collision from below
          else if (this.velocityY < 0 && this.absoluteY - this.velocityY >= platform.y + platform.height) {
            this.absoluteY = platform.y + platform.height
            this.y = this.absoluteY - window.scrollY
            this.velocityY = 0
          }
        }
      }
  }

  jump() {
    if (!this.isJumping && this.groundedPlatform) {
      this.velocityY = -16
      this.isJumping = true
    }
  }

  moveLeft() {
    this.x -= 4 // move speed
  }

  moveRight() {
    this.x += 4 // move speed
  }

  draw(ctx: CanvasRenderingContext2D) {
    // Draw player using rendered position
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  reset() {
    this.x = 50
    this.absoluteY = window.scrollY + window.innerHeight / 2
    this.y = this.absoluteY - window.scrollY
    this.velocityY = 0
    this.isJumping = false
    this.groundedPlatform = null
  }
}

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

  draw(ctx: CanvasRenderingContext2D) {
    // Draw platform relative to scroll position
    const adjustedY = this.y - window.scrollY
    ctx.fillStyle = 'black'
    ctx.fillRect(this.x, adjustedY, this.width, this.height)
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.strokeRect(this.x, adjustedY, this.width, this.height)
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const playerRef = useRef<Player | null>(null)
  const platformsRef = useRef<Platform[]>([])
  const keysRef = useRef<{ [key: string]: boolean }>({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Prevent space and arrow keys from scrolling
    window.addEventListener('keydown', (e) => {
      if (['Space', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
        e.preventDefault()
      }
    })

    // Update canvas size on resize
    function handleResize() {
      if (!canvas) return
      canvas.width = document.documentElement.scrollWidth
      canvas.height = document.documentElement.scrollHeight
    }

    // Initial size
    handleResize()

    // Listen for resize
    window.addEventListener('resize', handleResize)

    // Create player at top left
    playerRef.current = new Player(50, window.innerHeight / 2)

    // Create platforms on alternating sides with varying heights
    const platformWidth = 300
    const platformHeight = 10
    const platformGap = 150
    let isLeft = true
    platformsRef.current = []

    // Create more platforms to fill the entire page height
    const totalHeight = document.documentElement.scrollHeight
    const numPlatforms = Math.ceil(totalHeight / platformGap)+10

    for (let i = 0; i < numPlatforms; i++) {
      const x = isLeft ? 0 : canvas.width - platformWidth
      const y = 500 + 100 + i * platformGap
      platformsRef.current.push(new Platform(x, y, platformWidth, platformHeight))
      isLeft = !isLeft
    }

    // Update player reset logic
    function resetPlayer() {
      if (!playerRef.current) return
      
      playerRef.current.x = 50
      playerRef.current.y = 50
      playerRef.current.absoluteY = 50
      
      playerRef.current.velocityY = 0
      playerRef.current.isJumping = false
      playerRef.current.groundedPlatform = null

      // Scroll to player
      window.scrollTo({
        top: Math.max(0, playerRef.current.y - window.innerHeight / 2),
        behavior: 'instant'
      })
    }

    // Game loop
    function gameLoop() {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (playerRef.current) {
        // Handle input
        if (keysRef.current['a'] || keysRef.current['ArrowLeft']) {
          playerRef.current.moveLeft()
        }
        if (keysRef.current['d'] || keysRef.current['ArrowRight']) {
          playerRef.current.moveRight()
        }
        if (keysRef.current[' '] || keysRef.current['w'] || keysRef.current['W']) {
          playerRef.current.jump()
        }

        playerRef.current.update(platformsRef.current)

        // Center-focused scrolling using absolute position
        const idealScrollY = playerRef.current.absoluteY - (window.innerHeight / 2)
        const minScroll = 0
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight
        const targetScrollY = Math.max(minScroll, Math.min(maxScroll, idealScrollY))

        window.scrollTo({
          top: targetScrollY,
          behavior: 'instant'
        })

        // Check if player is out of bounds
        if (playerRef.current.y > document.documentElement.scrollHeight || 
            playerRef.current.x < 0 || 
            playerRef.current.x > canvas.width) {
          resetPlayer()
        }

        playerRef.current.draw(ctx)
      }

      // Draw platforms
      for (const platform of platformsRef.current) {
        platform.draw(ctx)
      }

      requestAnimationFrame(gameLoop)
    }

    // Initial player setup
    resetPlayer()

    // Start game loop
    gameLoop()

    // Event listeners
    function handleKeyDown(e: KeyboardEvent) {
      keysRef.current[e.key] = true
    }

    function handleKeyUp(e: KeyboardEvent) {
      keysRef.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    // Cleanup
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ 
        minHeight: '100vh',
        height: '100%',
        width: '100%',
        touchAction: 'none',
      }} 
    />
  )
}

export default InteractiveBackground