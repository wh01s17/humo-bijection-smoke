'use client'

import { useEffect, useRef } from 'react'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function SmokeTrail() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { width, height } = useWindowSize()

    useEffect(() => {
        if (typeof window === 'undefined' || width === null || height === null) return;

        const setupSmoke = async () => {
            const { default: SmokeMachine } = await import('@bijection/smoke')
            const canvas = canvasRef.current!
            const ctx = canvas.getContext('2d')

            if (!ctx) return

            canvas.width = width
            canvas.height = height

            const smokeParty = SmokeMachine(ctx, [54, 16.8, 18.2])
            smokeParty.start()

            const handleMouseMove = (e: MouseEvent) => {
                const { left, top } = canvas.getBoundingClientRect()
                const x = e.clientX - left
                const y = e.clientY - top
                smokeParty.addSmoke(x, y, 5)
            }

            canvas.addEventListener('mousemove', handleMouseMove)

            return () => {
                smokeParty.stop()
                canvas.removeEventListener('mousemove', handleMouseMove)
            }
        }

        setupSmoke().then(cleanupFn => {
            return cleanupFn
        })

    }, [width, height])

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <canvas
                ref={canvasRef}
                style={{
                    background: '#000',
                    display: 'block'
                }}
            />
        </div>
    )
}
