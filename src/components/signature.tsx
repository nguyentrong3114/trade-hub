"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function GearScene() {
    const mountRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Khởi tạo Scene ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(
            45,
            mountRef.current.clientWidth / mountRef.current.clientHeight,
            0.1,
            100
        );
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);

        // --- Ánh sáng ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        // --- Tạo Hình Bánh Răng Vuông (Gear Geometry) ---
        const shape = new THREE.Shape();
        const teeth = 7;
        const rOuter = 1.0;     // Bán kính đỉnh răng
        const rInner = 0.7;     // Bán kính hốc răng
        const holeRadius = 0.3; // Bán kính lỗ trục

        const segment = (Math.PI * 2) / teeth;
        const toothWidth = segment * 0.4; // Độ rộng của phần nhô lên

        for (let i = 0; i < teeth; i++) {
            const angle = i * segment;

            // Tính toán 4 góc của một răng vuông
            const a1 = angle - toothWidth;
            const a2 = angle + toothWidth;
            const aNext = (angle + segment) - toothWidth;

            if (i === 0) {
                shape.moveTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
            }

            // 1. Lên đỉnh răng (trái)
            shape.lineTo(Math.cos(a1) * rOuter, Math.sin(a1) * rOuter);
            // 2. Đi ngang đỉnh răng (phải)
            shape.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
            // 3. Xuống hốc răng (phải)
            shape.lineTo(Math.cos(a2) * rInner, Math.sin(a2) * rInner);
            // 4. Đi ngang đáy hốc răng đến chân răng tiếp theo
            shape.lineTo(Math.cos(aNext) * rInner, Math.sin(aNext) * rInner);
        }

        // Tạo lỗ tròn ở giữa
        const holePath = new THREE.Path();
        holePath.absarc(0, 0, holeRadius, 0, Math.PI * 2, true);
        shape.holes.push(holePath);

        // Tạo khối 3D từ shape phẳng
        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.4,
            bevelEnabled: true,
            bevelThickness: 0.02, // Giảm bevel để nhìn vuông vức hơn
            bevelSize: 0.02,
            bevelSegments: 3,
        });
        geometry.center();

        // Vật liệu xanh dương bóng bẩy
        const material = new THREE.MeshStandardMaterial({
            color: 0x3498db,
            metalness: 0.3,
            roughness: 0.2,
        });

        const gear = new THREE.Mesh(geometry, material);
        scene.add(gear);

        // --- Animation ---
        const animate = () => {
            requestAnimationFrame(animate);
            // Tạo hiệu ứng nghiêng nhẹ để thấy khối 3D
            //   gear.rotation.x = 0.5;

            renderer.render(scene, camera);
        };
        animate();

        // --- Xử lý Resize ---
        const handleResize = () => {
            if (!mountRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        };
        window.addEventListener("resize", handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                width: "100%",
                height: "500px",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid #eee"
            }}
        />
    );
}