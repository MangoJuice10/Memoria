import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FeedbackCard from '@/entities/feedback/ui/FeedbackCard.vue'
import StarIcon from '@/shared/ui/icons/common/StarIcon.vue'
import type { FeedbackResponseDto } from '@/entities/feedback/model/feedback-response.dto'

describe('FeedbackCard', () => {
  const mockFeedback: FeedbackResponseDto = {
    id: 1,
    content: 'Great flashcard deck!',
    rating: 4,
    deckId: 1,
    authorUsername: 'testuser',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  }

  it('renders StarIcon components instead of text stars', () => {
    const wrapper = mount(FeedbackCard, {
      props: { feedback: mockFeedback }
    })

    // Should render 5 StarIcon components
    const starIcons = wrapper.findAllComponents(StarIcon)
    expect(starIcons).toHaveLength(5)
  })

  it('applies correct classes for active and inactive stars', () => {
    const wrapper = mount(FeedbackCard, {
      props: { feedback: mockFeedback }
    })

    const starIcons = wrapper.findAllComponents(StarIcon)
    
    // First 4 stars should have icon-static-inverse class (rating is 4)
    for (let i = 0; i < 4; i++) {
      expect(starIcons[i].classes()).toContain('icon-static-inverse')
      expect(starIcons[i].classes()).not.toContain('icon-static')
    }
    
    // Last star should have icon-static class (rating < 5)
    expect(starIcons[4].classes()).toContain('icon-static')
    expect(starIcons[4].classes()).not.toContain('icon-static-inverse')
  })

  it('applies w-4 h-4 sizing classes to all stars', () => {
    const wrapper = mount(FeedbackCard, {
      props: { feedback: mockFeedback }
    })

    const starIcons = wrapper.findAllComponents(StarIcon)
    
    starIcons.forEach(star => {
      expect(star.classes()).toContain('w-4')
      expect(star.classes()).toContain('h-4')
    })
  })

  it('sets proper ARIA attributes', () => {
    const wrapper = mount(FeedbackCard, {
      props: { feedback: mockFeedback }
    })

    const ratingContainer = wrapper.find('[aria-label="Rating: 4 out of 5"]')
    expect(ratingContainer.exists()).toBe(true)

    const starIcons = wrapper.findAllComponents(StarIcon)
    starIcons.forEach(star => {
      expect(star.attributes('aria-hidden')).toBe('true')
    })
  })

  it('works correctly with different rating values', () => {
    const feedbackWithRating1 = { ...mockFeedback, rating: 1 }
    const wrapper = mount(FeedbackCard, {
      props: { feedback: feedbackWithRating1 }
    })

    const starIcons = wrapper.findAllComponents(StarIcon)
    
    // Only first star should be active
    expect(starIcons[0].classes()).toContain('icon-static-inverse')
    
    // Stars 2-5 should be inactive
    for (let i = 1; i < 5; i++) {
      expect(starIcons[i].classes()).toContain('icon-static')
    }
  })
})