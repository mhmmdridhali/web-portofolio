"use client"

import React, {
    ComponentPropsWithoutRef,
    useEffect,
    useMemo,
    useRef,
} from "react"

interface ParticlesProps extends ComponentPropsWithoutRef<"div"> {
    className?: string
    quantity?: number
    staticity?: number
    ease?: number
    size?: number
    refresh?: boolean
    color?: string
    vx?: number
    vy?: number
}

function hexToRgb(hex: string): number[] {
    hex = hex.replace("#", "")

    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("")
    }

    const hexInt = parseInt(hex, 16)
    const red = (hexInt >> 16) & 255
    const green = (hexInt >> 8) & 255
    const blue = hexInt & 255
    return [red, green, blue]
}

type Circle = {
    x: number
    y: number
    translateX: number
    translateY: number
    size: number
    alpha: number
    targetAlpha: number
    dx: number
    dy: number
    magnetism: number
}

export const Particles: React.FC<ParticlesProps> = ({
    className = "",
    quantity = 50,
    staticity = 50,
    ease = 50,
    size = 0.4,
    refresh = false,
    color = "#ffffff",
    vx = 0,
    vy = 0,
    ...props
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const canvasContainerRef = useRef<HTMLDivElement>(null)
    const context = useRef<CanvasRenderingContext2D | null>(null)
    const circles = useRef<Circle[]>([])
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
    const canvasSize = useRef<{ w: number; h: number; left: number; top: number }>({
        w: 0,
        h: 0,
        left: 0,
        top: 0,
    })
    const dpr =
        typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 2) : 1
    const rafID = useRef<number | null>(null)
    const resizeTimeout = useRef<NodeJS.Timeout | null>(null)

    const rgbString = useMemo(() => hexToRgb(color).join(", "), [color])

    useEffect(() => {
        if (canvasRef.current) {
            context.current = canvasRef.current.getContext("2d")
        }
        initCanvas()
        animate()

        const handleResize = () => {
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current)
            }
            resizeTimeout.current = setTimeout(() => {
                initCanvas()
            }, 200)
        }

        const handleMouseMove = (event: MouseEvent) => {
            const { w, h, left, top } = canvasSize.current
            if (w === 0 || h === 0) return
            const x = event.clientX - left - w / 2
            const y = event.clientY - top - h / 2
            const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2
            if (inside) {
                mouse.current.x = x
                mouse.current.y = y
            }
        }

        window.addEventListener("resize", handleResize, { passive: true })
        window.addEventListener("mousemove", handleMouseMove, { passive: true })

        return () => {
            if (rafID.current != null) {
                window.cancelAnimationFrame(rafID.current)
            }
            if (resizeTimeout.current) {
                clearTimeout(resizeTimeout.current)
            }
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rgbString])

    useEffect(() => {
        initCanvas()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh])

    const initCanvas = () => {
        resizeCanvas()
        drawParticles()
    }

    const resizeCanvas = () => {
        if (canvasContainerRef.current && canvasRef.current && context.current) {
            const rect = canvasRef.current.getBoundingClientRect()
            canvasSize.current.w = canvasContainerRef.current.offsetWidth
            canvasSize.current.h = canvasContainerRef.current.offsetHeight
            canvasSize.current.left = rect.left
            canvasSize.current.top = rect.top

            canvasRef.current.width = canvasSize.current.w * dpr
            canvasRef.current.height = canvasSize.current.h * dpr
            canvasRef.current.style.width = `${canvasSize.current.w}px`
            canvasRef.current.style.height = `${canvasSize.current.h}px`
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0)

            circles.current = []
            for (let i = 0; i < quantity; i++) {
                const circle = circleParams()
                drawCircle(circle)
            }
        }
    }

    const circleParams = (): Circle => {
        const x = Math.floor(Math.random() * canvasSize.current.w)
        const y = Math.floor(Math.random() * canvasSize.current.h)
        const translateX = 0
        const translateY = 0
        const pSize = Math.floor(Math.random() * 2) + size
        const alpha = 0
        const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1))
        const dx = (Math.random() - 0.5) * 0.1
        const dy = (Math.random() - 0.5) * 0.1
        const magnetism = 0.1 + Math.random() * 4
        return {
            x,
            y,
            translateX,
            translateY,
            size: pSize,
            alpha,
            targetAlpha,
            dx,
            dy,
            magnetism,
        }
    }

    const drawCircle = (circle: Circle, update = false) => {
        if (context.current) {
            const { x, y, translateX, translateY, size, alpha } = circle
            context.current.beginPath()
            context.current.arc(x + translateX, y + translateY, size, 0, 2 * Math.PI)
            context.current.fillStyle = `rgba(${rgbString}, ${alpha})`
            context.current.fill()

            if (!update) {
                circles.current.push(circle)
            }
        }
    }

    const clearContext = () => {
        if (context.current) {
            context.current.clearRect(
                0,
                0,
                canvasSize.current.w,
                canvasSize.current.h
            )
        }
    }

    const drawParticles = () => {
        clearContext()
        const particleCount = quantity
        for (let i = 0; i < particleCount; i++) {
            const circle = circleParams()
            drawCircle(circle)
        }
    }

    const remapValue = (
        value: number,
        start1: number,
        end1: number,
        start2: number,
        end2: number
    ): number => {
        const remapped =
            ((value - start1) * (end2 - start2)) / (end1 - start1) + start2
        return remapped > 0 ? remapped : 0
    }

    const animate = () => {
        clearContext()
        const w = canvasSize.current.w
        const h = canvasSize.current.h
        const list = circles.current
        for (let i = 0; i < list.length; i++) {
            const circle = list[i]
            const closestEdge = Math.min(
                circle.x + circle.translateX - circle.size,
                w - circle.x - circle.translateX - circle.size,
                circle.y + circle.translateY - circle.size,
                h - circle.y - circle.translateY - circle.size
            )
            const remapClosestEdge = remapValue(closestEdge, 0, 20, 0, 1)
            if (remapClosestEdge > 1) {
                circle.alpha += 0.02
                if (circle.alpha > circle.targetAlpha) {
                    circle.alpha = circle.targetAlpha
                }
            } else {
                circle.alpha = circle.targetAlpha * remapClosestEdge
            }
            circle.x += circle.dx + vx
            circle.y += circle.dy + vy
            circle.translateX +=
                (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
                ease
            circle.translateY +=
                (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
                ease

            drawCircle(circle, true)

            if (
                circle.x < -circle.size ||
                circle.x > w + circle.size ||
                circle.y < -circle.size ||
                circle.y > h + circle.size
            ) {
                list.splice(i, 1)
                const newCircle = circleParams()
                drawCircle(newCircle)
            }
        }
        rafID.current = window.requestAnimationFrame(animate)
    }

    return (
        <div
            className={["pointer-events-none", className].filter(Boolean).join(" ")}
            ref={canvasContainerRef}
            aria-hidden="true"
            {...props}
        >
            <canvas ref={canvasRef} className="size-full" />
        </div>
    )
}
