import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import SharedDeck from '@/pages/shared-decks/ui/SharedDeck.vue'
import StarIcon from '@/shared/ui/icons/common/StarIcon.vue'

// Mock the router and query dependencies
vi.mock('vue-router', () => ({
  useRoute: () => ({ params: { sharedDeckId: '1' } }),
  useRouter: () => ({ push: vi.fn() })
}))

vi.mock('@tanstack/vue-query', () => ({
  useQuery: () => ({
    data: {
      value: {
        id: 1,
        name: 'Test Deck',
        description: 'A test deck',
        coverUrl: null,
        averageRating: 4.2,
        flashcardsCount: 10,
        tags: [],
        ownerUsername: 'testuser',
        ownerId: 2,
        flashcards: [],
        feedback: []
      }
    },
    isLoading: false,
    error: null
  })
}))

vi.mock('@/shared/api', () => ({
  queryClient: { invalidateQueries: vi.fn() }
}))

vi.mock('@/app/router', () => ({
  getIdRouteParam: (id: string) => parseInt(id)
}))

vi.mock('@/entities/viewer', () => ({
  useViewerStore: () => ({ viewer: { value: { id: 1 } } })
}))

vi.mock('@/entities/shared-deck', () => ({
  sharedDecksApi: { getSharedDeck: vi.fn() },
  sharedDecksQueryKeys: { detail: vi.fn() }
}))

vi.mock('@/entities/shared-deck/api/mutations/copy-shared-deck.mutation', () => ({
  createCopySharedDeckMutation: () => ({ mutate: vi.fn(), isPending: false })
}))

vi.mock('@/shared/model', () => ({
  useToastStore: () => ({ push: vi.fn() })
}))

describe('SharedDeck StarIcon Implementation', () => {
  it('should render StarIcon components instead of text stars', () => {
    const wrapper = mount(SharedDeck, {
      global: {
        plugins: [createPinia()],
        stubs: {
          QueryState: false,
          TagChip: true,
          FeedbackCard: true,
          FeedbackForm: true,
          Button: true,
          Loader: true
        }
      }
    })

    // Should render 5 StarIcon components in the rating display
    const starIcons = wrapper.findAllComponents(StarIcon)
    expect(starIcons.length).toBeGreaterThanOrEqual(5)
  })

  it('should apply correct sizing classes to StarIcon components', () => {
    const wrapper = mount(SharedDeck, {
      global: {
        plugins: [createPinia()],
        stubs: {
          QueryState: false,
          TagChip: true,
          FeedbackCard: true,
          FeedbackForm: true,
          Button: true,
          Loader: true
        }
      }
    })

    const starIcons = wrapper.findAllComponents(StarIcon)
    
    // Check that star icons have the w-5 h-5 classes as specified in the task
    starIcons.forEach(star => {
      expect(star.classes()).toContain('w-5')
      expect(star.classes()).toContain('h-5')
    })
  })

  it('should apply correct icon classes based on rating', () => {
    const wrapper = mount(SharedDeck, {
      global: {
        plugins: [createPinia()],
        stubs: {
          QueryState: false,
          TagChip: true,
          FeedbackCard: true,
          FeedbackForm: true,
          Button: true,
          Loader: true
        }
      }
    })

    const starIcons = wrapper.findAllComponents(StarIcon)
    
    // With rating 4.2 (rounded to 4), first 4 stars should be active, last one inactive
    if (starIcons.length >= 5) {
      for (let i = 0; i < 4; i++) {
        expect(starIcons[i].classes()).toContain('icon-static-inverse')
      }
      expect(starIcons[4].classes()).toContain('icon-static')
    }
  })

  it('should have proper accessibility attributes', () => {
    const wrapper = mount(SharedDeck, {
      global: {
        plugins: [createPinia()],
        stubs: {
          QueryState: false,
          TagChip: true,
          FeedbackCard: true,
          FeedbackForm: true,
          Button: true,
          Loader: true
        }
      }
    })

    // Check for aria-label on the rating container
    const ratingContainer = wrapper.find('[aria-label*="Rating:"]')
    expect(ratingContainer.exists()).toBe(true)

    // Check that individual star icons have aria-hidden
    const starIcons = wrapper.findAllComponents(StarIcon)
    starIcons.forEach(star => {
      expect(star.attributes('aria-hidden')).toBe('true')
    })
  })
})