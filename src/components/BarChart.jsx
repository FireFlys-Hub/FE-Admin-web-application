// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    // Định dạng dữ liệu cho chart.js
    const chartData = {
        labels: data.map(item => item.date),
        datasets: [
            {
                label: 'Total Orders',
                data: data.map(item => item.total_orders),
                backgroundColor: data.map((_, index) => {
                    // Mảng các màu sắc khác nhau cho mỗi cột
                    const colors = [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(201, 203, 207, 0.2)',
                    ];
                    return colors[index % colors.length];
                }),
                borderColor: data.map((_, index) => {
                    // Mảng các màu sắc khác nhau cho mỗi đường viền của cột
                    const borderColors = [
                        'rgba(75, 192, 192, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(201, 203, 207, 1)',
                    ];
                    return borderColors[index % borderColors.length];
                }),
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Để cho phép tùy chỉnh kích thước
        plugins: {
            title: {
                display: true,
                position: 'bottom',
                text: 'Total Orders in the Last 7 Days',
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
