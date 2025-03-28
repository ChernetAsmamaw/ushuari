// File: components/organization/CasesByPriorityChart.tsx
"use client";

import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

type CasesByPriorityChartProps = {
  labels: string[];
  data: number[];
};

export const CasesByPriorityChart = ({
  labels,
  data,
}: CasesByPriorityChartProps) => {
  const chartRef = useRef<HTMLDivElement>(null);

  // Colors for different priorities
  const getColor = (index: number) => {
    const colors = [
      "#4ade80", // green - low
      "#facc15", // yellow - medium
      "#fb923c", // orange - high
      "#ef4444", // red - critical
    ];
    return colors[index] || colors[0];
  };

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear any previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const width = chartRef.current.clientWidth;
    const height = 220;
    const radius = Math.min(width, height) / 2;

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Calculate total
    const total = data.reduce((sum, value) => sum + value, 0);

    // Prepare data for pie chart
    const pie = d3.pie<number>().value((d) => d)(data);

    // Create arc
    const arc = d3
      .arc<d3.PieArcDatum<number>>()
      .innerRadius(radius * 0.6) // Create a donut chart
      .outerRadius(radius);

    // Create slices
    svg
      .selectAll("path")
      .data(pie)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (_, i) => getColor(i))
      .attr("stroke", "white")
      .style("stroke-width", "2px")
      .style("transition", "all 0.3s ease")
      .on("mouseover", function (event, d) {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", `scale(1.05)`);
      })
      .on("mouseout", function () {
        d3.select(this)
          .transition()
          .duration(300)
          .attr("transform", `scale(1)`);
      });

    // Add text in center
    svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "1.5rem")
      .attr("font-weight", "bold")
      .attr("fill", "#1e293b")
      .text(total.toString());

    // Add legend
    const legend = d3
      .select(chartRef.current)
      .append("div")
      .attr("class", "legend")
      .style("display", "flex")
      .style("justify-content", "center")
      .style("flex-wrap", "wrap")
      .style("gap", "1rem")
      .style("margin-top", "1rem");

    labels.forEach((label, i) => {
      const legendItem = legend
        .append("div")
        .style("display", "flex")
        .style("align-items", "center")
        .style("gap", "0.5rem");

      legendItem
        .append("div")
        .style("width", "12px")
        .style("height", "12px")
        .style("border-radius", "50%")
        .style("background-color", getColor(i));

      legendItem
        .append("span")
        .style("font-size", "0.75rem")
        .text(`${label}: ${data[i]}`);
    });
  }, [labels, data]);

  return <div ref={chartRef} className="w-full h-full" />;
};
