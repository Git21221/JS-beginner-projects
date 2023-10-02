const bars = document.querySelector('.bars');
let arr = [2, 6, 4, 3, 6, 3, 3, 5, 7, 8, 5, 34, 56, 87, 78, 4, 34, 7, 76, 5, 3, 4, 54, 45, 2, 23, 3, 43, 43, 4, 56, 56, 34, 34, 34, 3, 5, 4, 46, 54, 65, 45, 34, 24, 23, 23, 3, 34, 34, 34, 2, 23, 23, 23, 32, 3, 45, 56, 7, 76, 87, 78];
const n = arr.length;
for (let i = 0; i < n; i++) {
    const bar = document.createElement('span');
    bar.setAttribute('class', `${arr[i]}`);
    bar.style.height = `${arr[i] * 2}px`;
    bar.style.backgroundColor = 'black';
    bar.style.width = '5px';
    bar.style.margin = '2px';
    bars.appendChild(bar);
}
for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) { 
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}