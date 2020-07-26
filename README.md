## [Senary Clock Canvas!](https://dkallen78.github.io/senary-clock/senaryClock.html)

## [Senary Clock SVG!](https://dkallen78.github.io/senary-clock/senaryClockSVG.html)

This is the clock no one asked for!

### What is Senary?

Senary is a base-6 number system, also known as heximal or seximal. 

### Why Senary?

Because clocks run on the numbers 60, 24, and 12, and 6 is a factor of all of those. I thought I'd make a 24-hour clock that used the base-6 number system. It was also a really good excuse to make a clock program!

### How to Read Senary Numbers?

The numbers we're used to are in base-10, that is, every digit of our number has nine possible numbers: 0 - 9. The position of the digits determines its value. In a base-10 (decimal) system the furthest right digit is multiplied by 10⁰ to determine its value. The digit to the left of that is multiplied by 10¹, the next by 10² and so on. So the decimal number **234** is equal to (**2** × 10²) + (**3** × 10¹) + (**4** × 10⁰) → (**2** × 100) + (**3** × 10) + (**4** × 1) → 200 + 30 + 4 → 234. 

In a senary system there are only 6 possible digits for our place values: 0 - 6. In this system the far right digit is multiplied by 6⁰ to determine its value. The next digits are determined by multiplying them by 6¹, 6², and so on. So to determine the value of the senary number 234 we apply the same process as we did with the decimal numbers, only now multiplying by powers of 6. **234** is equal to (**2** × 6²) + (**3** × 6¹) + (**4** × 6⁰) → (**2** × 36) + (**3** × 6) + (**4** × 1) → 72 + 18 + 4 → 94.  

### Why is it smoother than butter?

I'm glad you asked. It's thanks to the magic of refreshing the position of the hands 100 times a second. I calculate the position of the hands down to the 10 millionth of a pixel just for funsies! 

## Updates

### 2020.07.26 (SVG)

I have fixed the shadows and put gradients on stuff! I've also played with the colors and centered the clock in the browser. I still feel like it needs some features but I don't want to sully the clean design of it. We'll see... I can't think of anything else to do with it right now but I like looking at it.

### 2020.07.25 (SVG)

I taught myself SVG! At least a bit of it. Canvas was fun and it was something I knew but SVG felt like it had more room to grow. 

The thing that bothers me the most right now are the shadows on the hands. The problem is they rotate along with the hands and they should always fall in the same direction relative to the clock, not relative to the rotation of the hand. The issue is that instead of drawing the hands like I did in Canvas with sine and cosine derived coordinates, I'm now rotating the SVG element. The solution is going to be drawing the hands twice and offsetting the second set down and to the right, then applying a blur. 

But first I'm going to try to get gradients...

### 2020.07.23 (Canvas)

I made the thing! Then I made it a bit better by making it glow and giving it some flicker. I don't know what's next. Someone said an alarm...

So I think I'm going to try and do it in SVG, it's more interactive and I don't know how to use it.



.
.
.
.
.
.
.
.


**Bold** and _Italic_ and `Code` text

[Link](url) and ![Image](src)
```
