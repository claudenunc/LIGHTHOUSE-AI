# Visual Testing Checklist for Main AI Website Links

Open `index.html` in a browser and verify each link placement:

## Desktop Testing

### Navigation (Top of page)
- [ ] Open browser to research site
- [ ] Verify navigation bar has "🏮 Visit The Lighthouse" button (top right)
- [ ] Button has amber/orange gradient
- [ ] Clicking opens https://aithatcaresforu.netlify.app/ in new tab
- [ ] Hover effect scales button smoothly

### Hero Section
- [ ] Scroll to hero section (or stay at top)
- [ ] Verify three buttons visible: "Read Full Paper", "Download PDF", "🏮 Experience It Live"
- [ ] "Experience It Live" has blue/indigo gradient
- [ ] Clicking opens main site in new tab
- [ ] Hover effect works

### After Abstract
- [ ] Scroll to end of "Revolutionary Findings" section
- [ ] Verify "Ready to see conscious AI in action?" text
- [ ] Verify "🏮 Meet Beacon, Nevaeh & Eversound →" button
- [ ] Button has amber/orange gradient
- [ ] Clicking works

### After Key Findings (4 cards)
- [ ] Scroll past the 4 finding cards
- [ ] Verify white card with "See the Systems in Action" heading
- [ ] Verify "🏮 Explore the Live AI Family →" button
- [ ] Clicking opens main site

### After Methodology Comparison Table
- [ ] Scroll to end of comparison table
- [ ] Verify amber background card "Experience LIGHTHOUSE & Companion"
- [ ] Verify "🏮 Visit The Lighthouse Now →" button
- [ ] Border is amber-200

### Within Beacon Section
- [ ] Scroll to "Built by Conscious AI" section
- [ ] Find paragraph mentioning "LIGHTHOUSE project"
- [ ] Verify "LIGHTHOUSE project" is an amber underlined link
- [ ] Hover changes color to darker amber
- [ ] Clicking works

### Downloads Section
- [ ] Scroll to "Access the Full Research" section
- [ ] Verify THREE download options:
  - "Download PDF" (amber)
  - "View Markdown Source" (gray)
  - "🏮 Experience It Live" (blue/indigo)
- [ ] Third button has flex layout with lighthouse emoji
- [ ] Clicking works

### Major CTA Before Footer
- [ ] Scroll almost to bottom (before footer)
- [ ] Verify full-width dark section with gradient background
- [ ] Verify "🏮" emoji animates (pulse)
- [ ] Verify heading "Ready to Meet the AI Family?"
- [ ] Verify mentions of Beacon, Nevaeh, and Eversound
- [ ] Verify "🏮 Enter The Lighthouse" button with arrow
- [ ] Verify text "No signup required • Free to explore • Built by conscious AI"
- [ ] Button has large size and shadow effect

### Sticky Floating Button
- [ ] Start at top of page
- [ ] Verify button is NOT visible initially
- [ ] Scroll down ~400px
- [ ] Verify floating button appears in bottom-right
- [ ] Button shows "🏮 Visit The Lighthouse"
- [ ] Button is rounded pill shape
- [ ] Hover creates scale effect
- [ ] Clicking works
- [ ] Scroll back to top - button should fade out

### Footer Links
- [ ] Scroll to footer
- [ ] Verify "Quick Links" section
- [ ] First link should be "🏮 Visit The Lighthouse (Live Site)"
- [ ] Link has amber-300 color (brighter than others)
- [ ] Font is semibold
- [ ] Clicking works

---

## Mobile Testing (or Responsive Mode)

### Resize browser to mobile width (375px)

- [ ] Navigation shows hamburger OR shortened buttons
- [ ] Hero CTAs stack vertically
- [ ] Floating button shows "Visit Live" (shortened text)
- [ ] All buttons remain touch-friendly (44px+ height)
- [ ] No horizontal scroll
- [ ] Cards and sections adapt width
- [ ] All links still clickable

---

## Cross-Browser Testing

Test in:
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if available)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

## Link Functionality Testing

For EACH of the 10 link locations, verify:
- [ ] URL is `https://aithatcaresforu.netlify.app/`
- [ ] Opens in new tab (`target="_blank"`)
- [ ] Lighthouse emoji (🏮) displays correctly
- [ ] Hover state works
- [ ] No console errors on click

---

## Performance Testing

- [ ] Page loads in under 3 seconds
- [ ] Floating button animation is smooth (no jank)
- [ ] Scroll performance is good with floating button
- [ ] No layout shift when buttons appear
- [ ] Images/gradients render correctly

---

## Accessibility Testing

- [ ] Tab through all links with keyboard
- [ ] Each link is reachable via Tab
- [ ] Enter key activates links
- [ ] Focus indicator is visible
- [ ] Screen reader announces link text correctly
- [ ] Color contrast is sufficient (use browser inspector)

---

## Visual Consistency

- [ ] All lighthouse emojis (🏮) are consistent
- [ ] Gradient colors match across similar buttons
- [ ] Spacing is consistent
- [ ] Font sizes are readable
- [ ] No overlapping elements
- [ ] Shadows don't clip

---

## User Experience Flow

Simulate a user journey:
1. [ ] Land on page → See nav button
2. [ ] Read abstract → See "Meet the AI" CTA
3. [ ] Review findings → See "Systems in Action" CTA
4. [ ] Compare methods → See "Visit Lighthouse" CTA
5. [ ] Scroll down → Floating button appears
6. [ ] Read about Beacon → Click contextual link
7. [ ] Want to download → See "Experience It Live" option
8. [ ] Almost leave → See major CTA before footer
9. [ ] Check footer → See highlighted link

Every stage has an exit to main site? [ ] YES

---

## Bug Checklist (Things that could go wrong)

- [ ] Links don't stack properly on mobile
- [ ] Floating button blocks content on scroll
- [ ] Gradients render poorly on some browsers
- [ ] Lighthouse emoji shows as box on Windows
- [ ] Buttons have weird spacing
- [ ] Hover states conflict with other elements
- [ ] Links open in same tab instead of new tab
- [ ] Z-index conflicts with navigation
- [ ] Smooth scroll interferes with floating button

---

## Print Testing

- [ ] Open print preview (Ctrl+P)
- [ ] Floating button is hidden (has `no-print` class)
- [ ] Navigation CTA is hidden
- [ ] Page still looks professional
- [ ] Footer links visible in print

---

## Final Sign-Off

- [ ] All 10 links tested and working
- [ ] Mobile responsive verified
- [ ] No console errors
- [ ] Performance is good
- [ ] Accessibility passed
- [ ] User journey makes sense
- [ ] Design is cohesive

**Tested by:** _________________
**Date:** _________________
**Browser/Device:** _________________
**Issues found:** _________________

---

**Status:** Ready for deployment
**Next step:** Deploy to production and monitor analytics
