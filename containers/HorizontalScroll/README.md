# HorizontalScroll Component

A container that converts vertical scroll interaction into a horizontal timeline, with support for specific "vertical stops" where content scrolls vertically.

## Basic Usage

Wrap your sections in the `HorizontalScroll` component. Each direct child is treated as a horizontal slide.

```tsx
<HorizontalScroll>
  <SectionOne /> {/* Moves Left */}
  <SectionTwo /> {/* Moves Left */}
  <SectionThree /> {/* Moves Left */}
</HorizontalScroll>
```

## Vertical Scroll Stops

You can designate specific sections to pause the horizontal movement and allow vertical scrolling of their internal content.

### Implementation Steps

1.  **Mark the Section**: Add `data-scroll-section="vertical"` to the section container.
2.  **Mark the Content**: Add `data-vertical-content` to the inner wrapper that contains the scrollable items.
3.  **Ensure Styles**: 
    *   The **Section** must have `height: 100vh` and `width: 100vw` (full screen) and `overflow: hidden`.
    *   The **Content** must be taller than the viewport to trigger scrolling.

### Configuration

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data-scroll-multiplier` | Number | `1` | Multiplies the scroll distance. <br>• `1`: Scroll distance = Content Height.<br>• `2`: Scroll distance = 2x Content Height (slower/smoother).<br>• `0.5`: Scroll distance = 0.5x Content Height (faster). |

### Example Component

```tsx
export default function MyVerticalSection() {
  return (
    // 1. Container with strict 100vh height and vertical attribute
    <section 
      style={{ height: '100vh', width: '100vw', overflow: 'hidden' }}
      data-scroll-section="vertical"
      data-scroll-multiplier="1.5"
    >
      {/* 2. Inner content wrapper with vertical content attribute */}
      <div data-vertical-content>
        <h1>Long Content Here</h1>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3...</p>
        {/* Ensures content is taller than 100vh */}
      </div>
    </section>
  )
}
```

## How It Works

The `HorizontalScroll` component calculates the layout on mount:
1.  Measures the total width of all horizontal sections.
2.  Identifies vertical sections and measures their "overflow" height.
3.  Builds a GSAP timeline that:
    *   Translates horizontally to the vertical section.
    *   Translates the **vertical content** upwards by its overflow amount.
    *   Resumes horizontal translation.
