var items = [12,5,8,4,6,13,1,10,15,2,3,11,7,9,14];
const original = [12,5,8,4,6,13,1,10,15,2,3,11,7,9,14];


const words = [
    [1, "one"],
    [2, "two"],
    [3, "three"],
    [4, "four"],
    [5, "five"],
    [6, "six"],
    [7, "seven"],
    [8, "eight"],
    [9, "nine"],
    [10, "ten"],
    [11, "eleven"],
    [12, "twelve"],
    [13, "thirteen"],
    [14, "fourteen"],
    [15, "fifteen"]
  ];
  const nums = new Map(words);

function resetBars() {
    var i;
    resetColors();
    items = [...original]
    for(i = 0; i < 15; i++) {
        document.getElementById(i.toString()).className = "bar " + nums.get(items[i])
    }
}

function resetColors() {
    for(i = 0; i < 15; i++) {
      document.getElementById(i.toString()).style.borderColor = "black"
    }
}

function updateColor() {
    for(i = 0; i < 15; i++) {
        if(document.getElementById(i.toString()).className == "bar " + nums.get(i+1)) {
            document.getElementById(i.toString()).style.borderColor = "#1f694e"
        } else {
            document.getElementById(i.toString()).style.borderColor = "#000000"
        }   
    }
}

function checkSorted() {
    for(i = 0; i < 15; i++) {
        if(document.getElementById(i.toString()).className != "bar " + nums.get(i+1)) {
            return false;
        } 
    }
    return true;
}

function swapClass(firstIndex,secondIndex) {
    
    const firstHeight = items[firstIndex]
    const secondHeight = items[secondIndex]

    const bar_one = document.getElementById(firstIndex.toString());
    const bar_two = document.getElementById(secondIndex.toString());

    bar_one.className = "bar " + nums.get(firstHeight);
    bar_two.className = "bar "  + nums.get(secondHeight);
    
  }

function swap(items, leftIndex, rightIndex){
    
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    
}

function repeat(i) {
    return new Promise(res =>{
        setTimeout(() =>{
            res(i)
        }, 200)
    })
}

async function selectionSort(arr,  n)
{
    var i, j, min_idx, x;

    // One by one move boundary of unsorted subarray
    for (i = 0; i < n-1; i++)
    {

        // Find the minimum element in unsorted array
        min_idx = i;
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx])
                min_idx = j;
        }

        let a = await repeat(x);
        swap(items, min_idx, i);
        swapClass(i,min_idx);
        updateColor();
        console.log(items);

    }

    resetButton.disabled = false;
    insertionButton.disabled = false;
    bubbleButton.disabled = false;
    combButton.disabled = false;
    gnomeButton.disabled = false;
}
  
async function insertionSort(arr, n) 
{ 
    let i, key, j, x; 
    for (i = 1; i < n; i++)
    { 
        key = arr[i]; 
        j = i - 1; 

        while (j >= 0 && arr[j] > key)
        { 
            arr[j + 1] = arr[j]; 
            swapClass(j,j+1)
            j = j-1;
        } 
        arr[j + 1] = key;

        let a = await repeat(x);
        swapClass(j+1,i)
        updateColor()
    } 
    resetButton.disabled = false;
    selectionButton.disabled = false;
    bubbleButton.disabled = false;
    combButton.disabled = false;
    gnomeButton.disabled = false;
}

async function bubbleSort(arr, n) {
    var i, j, x;
    for (i = 0; i < n-1; i++)
    {
        for (j = 0; j < n-i-1; j++)
        {
            if (arr[j] > arr[j+1])
            {
                let a = await repeat(x);
                swap(arr,j,j+1);
                swapClass(j+1,j)
                updateColor()
            }
        }
        
    }
    resetButton.disabled = false;
    insertionButton.disabled = false;
    selectionButton.disabled = false;
    combButton.disabled = false;
    gnomeButton.disabled = false;
}

    // To find gap between elements
    function getNextGap(gap)
    {
        // Shrink gap by Shrink factor
        gap = parseInt((gap*10)/13, 10);
        if (gap < 1)
            return 1;
        return gap;
    }
   
    // Function to sort arr[] using Comb Sort
async function combSort(arr) {
    let n = items.length;
    var x;
    // initialize gap
    let gap = n;

    // Initialize swapped as true to
    // make sure that loop runs
    let swapped = true;

    // Keep running while gap is more than
    // 1 and last iteration caused a swap
    while (gap != 1 || swapped == true) {
        // Find next gap
        gap = getNextGap(gap);

        // Initialize swapped as false so that we can
        // check if swap happened or not
        swapped = false;

        // Compare all elements with current gap
        for (let i=0; i<n-gap; i++)
        {
            if (items[i] > items[i+gap])
            {
                // Swap arr[i] and arr[i+gap]
                let a = await repeat(x);
                swap(items,i,i+gap)
                swapClass(i+gap,i)
                console.log(items)
                updateColor()
                // Set swapped
                swapped = true;
            }
        }
    }
    resetButton.disabled = false;
    insertionButton.disabled = false;
    selectionButton.disabled = false;
    bubbleButton.disabled = false;
    gnomeButton.disabled = false;
}

async function gnomeSort(arr, n) {
    let index = 0;
    var x;

    while (index < n) {
        if (index == 0)
            index++;
        if (arr[index] >= arr[index - 1])
            index++;
        else {
            let a = await repeat(x);
            swap(items,index,index-1)
            swapClass(index-1, index)
            updateColor()
            console.log(items)

            index--;
        }
    }
    resetButton.disabled = false;
    insertionButton.disabled = false;
    selectionButton.disabled = false;
    bubbleButton.disabled = false;
    combButton.disabled = false;
    return;
}

const selectionButton = document.getElementById("selection")
const insertionButton = document.getElementById("insertion")
const bubbleButton = document.getElementById("bubble")
const combButton = document.getElementById("comb")
const gnomeButton = document.getElementById("gnome")
const resetButton = document.getElementById("reset")

selectionButton.addEventListener("click", function() {
    console.log(checkSorted())
    if(!checkSorted()) {
        resetButton.disabled = true;
        insertionButton.disabled = true;
        bubbleButton.disabled = true;
        combButton.disabled = true;
        gnomeButton.disabled = true;
        
        selectionSort(items, 15)
    }
})

insertionButton.addEventListener("click", function() {
    if(!checkSorted()) {
        resetButton.disabled = true;
        selectionButton.disabled = true;
        bubbleButton.disabled = true;
        combButton.disabled = true;
        gnomeButton.disabled = true;
        insertionSort(items, 15)
    }
})

bubbleButton.addEventListener("click", function() {
    if(!checkSorted()) {
        resetButton.disabled = true;
        insertionButton.disabled = true;
        selectionButton.disabled = true;
        combButton.disabled = true;
        gnomeButton.disabled = true;
        bubbleSort(items, 15)
    }
})

combButton.addEventListener("click", function() {
    if(!checkSorted()) {
        resetButton.disabled = true;
        selectionButton.disabled = true;
        bubbleButton.disabled = true;
        gnomeButton.disabled = true;
        insertionButton.disabled = true;
        combSort()
    }
})


gnomeButton.addEventListener("click", function() {
    if(!checkSorted()) {
        resetButton.disabled = true;
        selectionButton.disabled = true;
        bubbleButton.disabled = true;
        insertionButton.disabled = true;
        combButton.disabled = true;
        gnomeSort(items, 15)
    }
})

resetButton.addEventListener("click", function() {
    resetBars()
})

