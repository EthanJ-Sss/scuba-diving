"use client"

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type MapMarker = {
	id: string
	coordinates: [number, number] // [lng, lat]
	color?: string
	popupHtml?: string
}

type MapProps = {
	center?: [number, number];
	zoom?: number;
	styleUrl?: string;
	className?: string;
  markers?: MapMarker[]
};

export type MapHandle = {
  flyTo: (lng: number, lat: number, zoom?: number) => void
}

const Map = forwardRef<MapHandle, MapProps>(function Map({
	center = [116.397, 39.907],
	zoom = 2,
	styleUrl = "https://demotiles.maplibre.org/style.json",
  className,
  markers = [],
}: MapProps, ref) {
	const containerRef = useRef<HTMLDivElement | null>(null);
	const mapRef = useRef<maplibregl.Map | null>(null);

	const engine = useMemo(() => (process.env.NEXT_PUBLIC_MAP_ENGINE ?? 'maplibre').toLowerCase(), [])

	useEffect(() => {
		if (!containerRef.current || mapRef.current) return;
		const map = new maplibregl.Map({
			container: containerRef.current,
			style: styleUrl,
			center,
			zoom,
		});
		map.addControl(new maplibregl.NavigationControl(), "top-right");
		mapRef.current = map;
		return () => {
			map.remove();
			mapRef.current = null;
		};
	}, [center, zoom, styleUrl]);

	useEffect(() => {
		const map = mapRef.current
		if (!map) return
		// 清理旧标记
		const markerInstances: maplibregl.Marker[] = []
		markers.forEach((m) => {
			const el = document.createElement('div')
			el.style.width = '12px'
			el.style.height = '12px'
			el.style.borderRadius = '9999px'
			el.style.background = m.color ?? '#2563eb'
			el.style.boxShadow = '0 0 0 2px white'
			const marker = new maplibregl.Marker(el).setLngLat(m.coordinates)
			if (m.popupHtml) marker.setPopup(new maplibregl.Popup({ offset: 12 }).setHTML(m.popupHtml))
			marker.addTo(map)
			markerInstances.push(marker)
		})
		return () => {
			markerInstances.forEach((mk) => mk.remove())
		}
	}, [markers])

	useImperativeHandle(ref, () => ({
		flyTo: (lng: number, lat: number, z?: number) => {
			const map = mapRef.current
			if (!map) return
			map.flyTo({ center: [lng, lat], zoom: z ?? Math.max(zoom, 5) })
		},
	}))

	return (
		<div ref={containerRef} className={className ?? "w-full h-[60vh] rounded-md"} data-engine={engine} />
	);
})

export default Map


