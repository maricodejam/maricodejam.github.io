<script module>
	export const metadata = {
		title: "Lesson 1",
		description: "DSA Fundamentals"
	}
    import Codeblock from "$lib/components/Codeblock.svelte"
    import FunctionGraph from "$lib/components/graph/FunctionGraph.svelte"
</script>

# {metadata.title}
{metadata.description}

## What is Competitive Programming
Competitive programming is a way to test your programming knowledge by being able to solve programming challenges. You are given a specific problem and we are task to solve that problem by writing a solution program. From there, your solution is used to solve predefined input to check its validity. We call each one of those input a *testcase*

There exists multiple sections of a typical problem and they may vary for different instutions. Here are the most common one:

### The Question

You are given a context and a question that describe a problem and what you are supose to output

For example, given 3 integer a, b, c make a function `average_of_three_int` that computes the average of those numbers and returns it.

In python we can do the following:

<Codeblock lang="python" code="
def average_of_three_int(a: int, b: int, c: int) -> float:
    return (a + b + c) / 3.0
"/>
 

### Possible testcases

Typically in a website or contest, there will be an example of what an testcase input could be and what is the expected output is.

For our example, it could be:
<div class="flex gap-5 w-full">
    <Codeblock class="flex-1" lang="" caption="input" code="1 3 5" />
    <Codeblock class="flex-1" lang="" caption="output" code="3.0" />
</div>

### Information about the input

You are given information about your input. For example if you're given integers that may include at what range you can expect your numbers to be in, while for strings it can tell you if you only have lowercase case alphabet letters, if there is special characters or your string length.

Those can be important. For example in certain language int typically have a maximum value if you're given really big int you might now be able to represent the sum of those numbers with an int and might need another number type.

For our example, it could be:
<Codeblock class="flex-1" lang="" caption="input" code=" 0 < a,b,c <= 2000 " />




### Failed submission
When you will submit your solution, there are three ways for your solution to fail.

1. `Time Limit Exceeded`. Your solution takes to much time and needs to be faster
2. `Wrong answer`. Your solution returned a wrong answer.
3. `Compilation/Runtime error`. Your solution doesn't compile/run properly.


When faced with any of those issue you need to apply the appropriate changes.


Now that you know more about what competitive programming is and have a basic idea of what competitive programming is. Lets introduce Data Structure and Algorithms.



## What is Data Structure and Algorithms(DSA)

Data structure represent in what structure data in a program is represented. While algorithms are procedures that given an input it return a specified output. Then DSA, is a way to construct algorithms using data structures.

But one cannot introduce data structure and algorithms without talking about big O notation.

### BIG O notation

Big O notation is a way in which we can grade different algorithms. It works by ranking an algorithm based on it's speed and memory usage. For example given n integers you're program run n<sup>2</sup>+ 3n + 5 steps and uses 2n + 3 items in memory. In Big O notation we'll say that your program has O(n<sup>2</sup>) runtime and a O(n) overhead.

Why do we use only the bigger term and discard the other terms of the polymonial. First, because they don't matter as much as we have more and more input. At first if you look on  

<FunctionGraph domain={[0, 1000]} tickLength={100} functions={[
    {
        id: 0,
        fn: (x) => x * x,
        label: "x^2",
        color: "#00f"
    },
    {
        id: 1,
        fn: (x) => 2 * x,
        label: "2x",
        color: "#0ff"
    }
]}/>
