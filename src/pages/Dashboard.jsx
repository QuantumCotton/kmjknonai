import { useState, useEffect, useCallback } from 'react'
import { 
  Plus, 
  FileText, 
  Calendar, 
  DollarSign, 
  Phone, 
  Mail, 
  Edit, 
  Trash2, 
  MessageSquare,
  Search,
  Filter,
  Clock,
  MapPin,
  LayoutGrid,
  LayoutList,
  Calendar as CalendarIcon,
  Tag as TagIcon,
  Image as ImageIcon,
  Mic,
  Sparkles,
  Send,
  User as UserIcon,
  MessageCircle,
  Bot,
  History,
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { processCrewUpdate, generateJobSummary, processHomeownerQuestion, getApiKey } from '@/services/zaiService.js'
import { jobsApi, tagsApi } from '@/lib/supabaseClient.js'
import VoiceInput from '@/components/voice-input.jsx'

// Job status options
const STATUSES = [
  { value: 'lead', label: 'Lead', color: 'bg-blue-500' },
  { value: 'estimating', label: 'Estimating', color: 'bg-yellow-500' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-purple-500' },
  { value: 'in-progress', label: 'In Progress', color: 'bg-orange-500' },
  { value: 'completed', label: 'Completed', color: 'bg-green-500' },
  { value: 'on-hold', label: 'On Hold', color: 'bg-gray-500' },
]

const JOB_TYPES = [
  'Kitchen Remodel',
  'Bathroom Remodel',
  'Handyman Services',
  'Epoxy Flooring',
  'TV Mounting',
  'Christmas Lighting',
  'Gutter Guards',
  'Roofing',
  'Energy Rebates',
  'Other',
]

// View types
const VIEW_TYPES = [
  { value: 'kanban', label: 'Kanban', icon: LayoutGrid },
  { value: 'list', label: 'List', icon: LayoutList },
  { value: 'calendar', label: 'Calendar', icon: CalendarIcon },
]

// Helper functions
const getJobCountByStatus = (jobs) => {
  return jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1
    return acc
  }, {})
}

const formatDate = (dateString) => {
  if (!dateString) return 'Not set'
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  })
}

const formatDateTime = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2)
}

const getAllTagsFromJobs = (jobs) => {
  const tagCounts = {}
  jobs.forEach(job => {
    (job.tags || []).forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  return tagCounts
}

// Transform Supabase job to frontend format
const transformJobFromDB = (dbJob) => ({
  id: dbJob.id,
  company: dbJob.company || '',
  clientName: dbJob.client_name || '',
  clientEmail: dbJob.client_email || '',
  clientPhone: dbJob.client_phone || '',
  jobType: dbJob.job_type || '',
  description: dbJob.description || '',
  status: dbJob.status || 'lead',
  location: dbJob.location || '',
  budget: dbJob.budget ? parseFloat(dbJob.budget) : null,
  estimatedCompletion: dbJob.estimated_completion || null,
  notes: dbJob.notes || [],
  createdAt: dbJob.created_at,
  files: dbJob.files || [],
  photos: dbJob.photos || [],
  tags: dbJob.tags || [],
  aiSummary: dbJob.ai_summary || null
})

// Transform frontend job to Supabase format
const transformJobToDB = (frontendJob) => ({
  company: frontendJob.company || '',
  client_name: frontendJob.clientName || '',
  client_email: frontendJob.clientEmail || '',
  client_phone: frontendJob.clientPhone || '',
  job_type: frontendJob.jobType || '',
  description: frontendJob.description || '',
  status: frontendJob.status || 'lead',
  location: frontendJob.location || '',
  budget: frontendJob.budget || null,
  estimated_completion: frontendJob.estimatedCompletion || null,
  notes: frontendJob.notes || [],
  files: frontendJob.files || [],
  photos: frontendJob.photos || [],
  tags: frontendJob.tags || [],
  ai_summary: frontendJob.aiSummary || null
})

// Save API key to localStorage (for development)
const saveApiKey = (apiKey) => {
  localStorage.setItem('kmjk_openai_api_key', apiKey)
}

// Get API key from localStorage or environment
const getApiKeyFromStorage = () => {
  const storedKey = localStorage.getItem('kmjk_zai_api_key')
  if (storedKey && storedKey.trim() !== '') {
    return storedKey
  }
  return getApiKey() // Fallback to environment variable
}

export default function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [tags, setTags] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedTags, setSelectedTags] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [newNote, setNewNote] = useState('')
  const [viewType, setViewType] = useState('list')
  const [showTagManager, setShowTagManager] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    jobType: JOB_TYPES[0],
    description: '',
    status: 'lead',
    location: '',
    budget: '',
    estimatedCompletion: '',
    tags: [],
  })

  // Tag management state
  const [newTag, setNewTag] = useState('')

  // Load jobs and tags from Supabase on mount
  useEffect(() => {
    loadInitialData()
    setupRealtimeSubscription()
    
    document.title = 'KMJK Job Dashboard'
  }, [])

  const loadInitialData = async () => {
    try {
      setIsLoading(true)
      setError(null)
      console.log('[Dashboard] Loading data from Supabase...')
      
      // Load jobs from Supabase
      const jobsData = await jobsApi.getAll()
      console.log('[Dashboard] Loaded jobs:', jobsData.length)
      
      // Transform jobs to frontend format
      const transformedJobs = jobsData.map(transformJobFromDB)
      setJobs(transformedJobs)
      
      // Load tags from Supabase
      const tagsData = await tagsApi.getAll()
      console.log('[Dashboard] Loaded tags:', tagsData.length)
      setTags(tagsData)
      
      setIsLoading(false)
    } catch (err) {
      console.error('[Dashboard] Failed to load data:', err)
      setError('Failed to load data. Please check your Supabase configuration.')
      setIsLoading(false)
    }
  }

  // Setup real-time subscription
  const setupRealtimeSubscription = useCallback(() => {
    const unsubscribe = jobsApi.subscribeToChanges((payload) => {
      console.log('[Dashboard] Real-time update:', payload.eventType, payload)
      
      switch (payload.eventType) {
        case 'INSERT':
          const newJob = transformJobFromDB(payload.new)
          setJobs(prevJobs => [newJob, ...prevJobs])
          break
          
        case 'UPDATE':
          setJobs(prevJobs => {
            const index = prevJobs.findIndex(job => job.id === payload.new.id)
            if (index !== -1) {
              const updatedJobs = [...prevJobs]
              updatedJobs[index] = transformJobFromDB(payload.new)
              
              // Update selectedJob if it's the same job
              if (selectedJob?.id === payload.new.id) {
                setSelectedJob(transformJobFromDB(payload.new))
              }
              
              return updatedJobs
            }
            return prevJobs
          })
          break
          
        case 'DELETE':
          setJobs(prevJobs => prevJobs.filter(job => job.id !== payload.old.id))
          if (selectedJob?.id === payload.old.id) {
            setSelectedJob(null)
          }
          break
      }
    })

    return unsubscribe
  }, [selectedJob])

  // Update tag counts when jobs change
  const updateTagCounts = useCallback(async () => {
    try {
      await tagsApi.recalculateCounts()
      const updatedTags = await tagsApi.getAll()
      setTags(updatedTags)
    } catch (err) {
      console.error('[Dashboard] Failed to update tag counts:', err)
    }
  }, [])

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.jobType?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.every(tag => (job.tags || []).includes(tag))
    
    return matchesSearch && matchesStatus && matchesTags
  })

  // Reset form
  const resetForm = () => {
    setFormData({
      company: '',
      clientName: '',
      clientEmail: '',
      clientPhone: '',
      jobType: JOB_TYPES[0],
      description: '',
      status: 'lead',
      location: '',
      budget: '',
      estimatedCompletion: '',
      tags: [],
    })
  }

  // Add new job
  const handleAddJob = async () => {
    try {
      const createdJob = await jobsApi.create(formData)
      const transformedJob = transformJobFromDB(createdJob)
      
      // Add to local state immediately for better UX
      setJobs(prevJobs => [transformedJob, ...prevJobs])
      
      // Update tag counts
      if (formData.tags?.length > 0) {
        await updateTagCounts()
      }
      
      resetForm()
      setShowAddDialog(false)
    } catch (err) {
      console.error('[Dashboard] Failed to add job:', err)
      alert('Failed to add job. Please try again.')
    }
  }

  // Update job
  const handleUpdateJob = async () => {
    if (!selectedJob) return
    
    try {
      const updatedJob = await jobsApi.update(selectedJob.id, transformJobToDB(formData))
      const transformedJob = transformJobFromDB(updatedJob)
      
      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === selectedJob.id ? transformedJob : job)
      )
      
      // Update tag counts if tags changed
      if (formData.tags?.length > 0) {
        await updateTagCounts()
      }
      
      setShowEditDialog(false)
      setSelectedJob(null)
      resetForm()
    } catch (err) {
      console.error('[Dashboard] Failed to update job:', err)
      alert('Failed to update job. Please try again.')
    }
  }

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return
    
    try {
      await jobsApi.delete(jobId)
      
      // Update local state
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId))
      
      // Update tag counts
      await updateTagCounts()
    } catch (err) {
      console.error('[Dashboard] Failed to delete job:', err)
      alert('Failed to delete job. Please try again.')
    }
  }

  // Add note to job
  const handleAddNote = async () => {
    if (!newNote.trim() || !selectedJob) return
    
    try {
      const note = {
        id: Date.now().toString(),
        text: newNote.trim(),
        timestamp: new Date().toISOString(),
        type: 'update',
        author: 'contractor'
      }
      
      const updatedJob = await jobsApi.addNote(selectedJob.id, note)
      const transformedJob = transformJobFromDB(updatedJob)
      
      // Update local state
      setJobs(prevJobs => 
        prevJobs.map(job => job.id === selectedJob.id ? transformedJob : job)
      )
      
      setSelectedJob(transformedJob)
      setNewNote('')
    } catch (err) {
      console.error('[Dashboard] Failed to add note:', err)
      alert('Failed to add note. Please try again.')
    }
  }

  // Open edit dialog
  const openEditDialog = (job) => {
    setSelectedJob(job)
    setFormData({
      company: job.company || '',
      clientName: job.clientName || '',
      clientEmail: job.clientEmail || '',
      clientPhone: job.clientPhone || '',
      jobType: job.jobType || JOB_TYPES[0],
      description: job.description || '',
      status: job.status || 'lead',
      location: job.location || '',
      budget: job.budget || '',
      estimatedCompletion: job.estimatedCompletion || '',
      tags: job.tags || []
    })
    setShowEditDialog(true)
  }

  // Add new tag
  const handleAddTag = async () => {
    if (!newTag.trim() || tags.find(t => t.label.toLowerCase() === newTag.toLowerCase())) return
    
    try {
      await tagsApi.create(newTag.trim())
      const updatedTags = await tagsApi.getAll()
      setTags(updatedTags)
      setNewTag('')
    } catch (err) {
      console.error('[Dashboard] Failed to add tag:', err)
      alert('Failed to add tag. Please try again.')
    }
  }

  // Delete tag
  const handleDeleteTag = async (tagId) => {
    try {
      await tagsApi.delete(tagId)
      setTags(prevTags => prevTags.filter(t => t.id !== tagId))
    } catch (err) {
      console.error('[Dashboard] Failed to delete tag:', err)
      alert('Failed to delete tag. Please try again.')
    }
  }

  // Toggle tag selection
  const toggleTagSelection = (tagLabel) => {
    if (selectedTags.includes(tagLabel)) {
      setSelectedTags(selectedTags.filter(t => t !== tagLabel))
    } else {
      setSelectedTags([...selectedTags, tagLabel])
    }
  }

  // Get status badge
  const getStatusBadge = (status) => {
    const statusConfig = STATUSES.find(s => s.value === status) || STATUSES[0]
    return (
      <Badge className={`${statusConfig.color} text-white`}>
        {statusConfig.label}
      </Badge>
    )
  }

  // Get view icon
  const CurrentViewIcon = VIEW_TYPES.find(v => v.value === viewType)?.icon || LayoutList

  const statusCounts = getJobCountByStatus(jobs)

  // Render list view
  const renderListView = () => (
    <div className="space-y-4">
      {filteredJobs.length === 0 ? (
        <Card className="p-8 text-center">
          <FileText size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </Card>
      ) : (
        filteredJobs.map(job => (
          <Card 
            key={job.id} 
            className="p-5 cursor-pointer transition-all hover:shadow-lg"
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-[var(--deep-charcoal)]">{job.clientName}</h3>
                  {getStatusBadge(job.status)}
                </div>
                <p className="text-sm text-gray-600">{job.company}</p>
                {(job.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {job.tags.slice(0, 4).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <TagIcon size={10} className="mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {job.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{job.tags.length - 4}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => { e.stopPropagation(); openEditDialog(job) }}
                >
                  <Edit size={16} />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => { e.stopPropagation(); handleDeleteJob(job.id) }}
                >
                  <Trash2 size={16} className="text-red-500" />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText size={14} />
                <span className="font-medium">{job.jobType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={14} />
                <span>{job.location || 'No location'}</span>
              </div>
              {job.description && (
                <p className="text-gray-600 line-clamp-2">{job.description}</p>
              )}
              <div className="flex items-center gap-4 text-gray-600 pt-2">
                {job.budget && (
                  <div className="flex items-center gap-1">
                    <DollarSign size={14} />
                    <span>${job.budget.toLocaleString()}</span>
                  </div>
                )}
                {job.estimatedCompletion && (
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(job.estimatedCompletion)}</span>
                  </div>
                )}
              </div>
            </div>

            {job.notes && job.notes.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MessageSquare size={14} />
                  <span>{job.notes.length} note{job.notes.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            )}
          </Card>
        ))
      )}
    </div>
  )

  // Render kanban view
  const renderKanbanView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {STATUSES.map(status => {
        const statusJobs = filteredJobs.filter(job => job.status === status.value)
        return (
          <Card key={status.value} className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <h3 className="font-semibold">{status.label}</h3>
              </div>
              <Badge variant="outline">{statusJobs.length}</Badge>
            </div>
            <div className="space-y-3 min-h-[200px]">
              {statusJobs.map(job => (
                <Card
                  key={job.id}
                  className="p-3 cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{job.clientName}</h4>
                    <div className="flex gap-1">
                      <Button size="xs" variant="ghost" onClick={(e) => { e.stopPropagation(); openEditDialog(job) }}>
                        <Edit size={12} />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{job.company}</p>
                  {(job.tags || []).length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {job.tags.slice(0, 2).map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px]">
                          {tag}
                        </Badge>
                      ))}
                      {job.tags.length > 2 && <span className="text-xs text-gray-400">+{job.tags.length - 2}</span>}
                    </div>
                  )}
                </Card>
              ))}
              {statusJobs.length === 0 && (
                <div className="text-center text-sm text-gray-400 py-8">
                  No jobs
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--warm-off-white)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--deep-charcoal)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--warm-off-white)] flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadInitialData}>Retry</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--warm-off-white)]">
      {/* Header */}
      <header className="bg-[var(--deep-charcoal)] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="text-[var(--brushed-gold)]" size={28} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">KMJK Job Dashboard</h1>
              <p className="text-sm text-gray-300">Manage work orders & estimates</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-300">Total Jobs</div>
              <div className="text-2xl font-bold text-[var(--brushed-gold)]">{jobs.length}</div>
            </div>
            <Button 
              onClick={() => window.location.href = '/history'} 
              variant="outline" 
              className="bg-[#2a2a2a] text-white border-white mr-2 hover:bg-[#3a3a3a]"
            >
              <History size={18} className="mr-2" />
              History
            </Button>
            <Button onClick={() => setShowTagManager(true)} variant="outline" className="bg-[#2a2a2a] text-white border-white hover:bg-[#3a3a3a]">
              <TagIcon size={18} className="mr-2" />
              Tags
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-yellow-500 font-semibold">
                  <Plus size={18} className="mr-2" />
                  Add Job
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Job</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="col-span-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nordstrom, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientName">Client Name</Label>
                    <Input
                      id="clientName"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientEmail">Email</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      value={formData.clientEmail}
                      onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Phone</Label>
                    <Input
                      id="clientPhone"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      placeholder="772-555-0101"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {JOB_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe work needed..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="Project location"
                    />
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget ($)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      placeholder="5000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map(status => (
                          <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimatedCompletion">Est. Completion</Label>
                    <Input
                      id="estimatedCompletion"
                      type="date"
                      value={formData.estimatedCompletion}
                      onChange={(e) => setFormData({ ...formData, estimatedCompletion: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="tags">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map(tag => (
                        <Badge
                          key={tag.id}
                          variant={formData.tags?.includes(tag.label) ? 'default' : 'outline'}
                          className={`cursor-pointer ${tag.color}`}
                          onClick={() => {
                            const currentTags = formData.tags || []
                            if (currentTags.includes(tag.label)) {
                              setFormData({ ...formData, tags: currentTags.filter(t => t !== tag.label) })
                            } else {
                              setFormData({ ...formData, tags: [...currentTags, tag.label] })
                            }
                          }}
                        >
                          <TagIcon size={10} className="mr-1" />
                          {tag.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => { resetForm(); setShowAddDialog(false) }}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddJob} className="bg-[var(--deep-charcoal)]">
                    Add Job
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {STATUSES.map(status => (
            <Card key={status.value} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold">{statusCounts[status.value] || 0}</div>
                  <div className="text-sm text-gray-600">{status.label}</div>
                </div>
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Filters & View Toggle */}
        <Card className="p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col md:flex-row gap-4 flex-1">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter size={18} className="mr-2 text-gray-400" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {STATUSES.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">View:</span>
              <div className="flex gap-2">
                {VIEW_TYPES.map(view => {
                  const Icon = view.icon
                  return (
                    <Button
                      key={view.value}
                      size="sm"
                      variant={viewType === view.value ? "default" : "outline"}
                      onClick={() => setViewType(view.value)}
                      className="flex items-center gap-1"
                    >
                      <Icon size={16} />
                      <span className="hidden md:inline">{view.label}</span>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Active Tag Filters */}
          {selectedTags.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active Filters:</span>
                {selectedTags.map(tag => (
                  <Badge key={tag} className="flex items-center gap-1">
                    <TagIcon size={10} />
                    {tag}
                    <button
                      onClick={() => toggleTagSelection(tag)}
                      className="ml-1 hover:text-red-500"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedTags([])}
                  className="text-xs"
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </Card>

        {/* Jobs View */}
        <div>
          {viewType === 'list' && renderListView()}
          {viewType === 'kanban' && renderKanbanView()}
          {viewType === 'calendar' && (
            <Card className="p-8 text-center">
              <CalendarIcon size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
              <p className="text-sm text-gray-600">Coming soon</p>
            </Card>
          )}
        </div>
      </div>

      {/* API Key Configuration Dialog */}
      <Dialog open={showTagManager} onOpenChange={setShowTagManager}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="openaiApiKey">OpenAI API Key</Label>
              <Input
                id="openaiApiKey"
                type="password"
                value={getApiKey()}
                onChange={(e) => saveApiKey(e.target.value)}
                placeholder="Enter your OpenAI API key..."
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-2">
                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">OpenAI Platform</a>
              </p>
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Existing Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2 max-h-60 overflow-y-auto">
                {tags.map(tag => (
                  <Badge key={tag.id} className={`flex items-center gap-2 ${tag.color}`}>
                    <TagIcon size={10} />
                    {tag.label}
                    <span className="text-xs">({tag.count})</span>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDeleteTag(tag.id)}
                      className="h-4 w-4 p-0 hover:text-red-500"
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Details Modal */}
      <Dialog open={!!selectedJob} onOpenChange={(open) => { if (!open) setSelectedJob(null) }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Job Details
              <Button size="sm" variant="ghost" onClick={() => setSelectedJob(null)}>
                ✕
              </Button>
            </DialogTitle>
          </DialogHeader>          
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="notes">Notes ({(selectedJob?.notes || []).length})</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="summary">AI Summary</TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--deep-charcoal)] flex items-center justify-center text-white font-semibold">
                  {selectedJob && getInitials(selectedJob.clientName)}
                </div>
                <div>
                  <h4 className="font-semibold text-lg">{selectedJob?.clientName}</h4>
                  <p className="text-sm text-gray-600">{selectedJob?.company}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Mail size={16} className="text-gray-400" />
                  <span>{selectedJob?.clientEmail || 'No email'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone size={16} className="text-gray-400" />
                  <span>{selectedJob?.clientPhone || 'No phone'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span>{selectedJob?.location || 'No location'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FileText size={16} className="text-gray-400" />
                  <span>{selectedJob?.jobType}</span>
                </div>
                {selectedJob?.budget && (
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign size={16} className="text-gray-400" />
                    <span>${selectedJob.budget.toLocaleString()}</span>
                  </div>
                )}
                {selectedJob?.estimatedCompletion && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-gray-400" />
                    <span>Est. Completion: {formatDate(selectedJob.estimatedCompletion)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span>Created: {formatDate(selectedJob?.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {selectedJob && getStatusBadge(selectedJob.status)}
                </div>
              </div>

              {selectedJob?.description && (
                <>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Description</Label>
                    <p className="text-sm text-gray-600 mt-1">{selectedJob.description}</p>
                  </div>
                </>
              )}

              {(selectedJob?.tags || []).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedJob.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <TagIcon size={10} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {(selectedJob?.files || []).length > 0 && (
                <>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Files</Label>
                    <div className="space-y-2 mt-2">
                      {selectedJob.files.map((file, idx) => (
                        <a
                          key={idx}
                          href={`/${encodeURI(file)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-sm text-blue-600 hover:underline truncate"
                        >
                          {file}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              {/* Manual Note Input */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Add a Note</Label>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Type your note here..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={3}
                    className="resize-none"
                  />
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleAddNote}
                      disabled={!newNote.trim()}
                      className="flex-1"
                    >
                      <Send size={16} className="mr-2" />
                      Add Note
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Voice Input */}
              <div>
                <Label className="text-sm font-medium mb-3 block">Or Use Voice Input</Label>
                <VoiceInput 
                  onAddNote={async (noteText, suggestedTags) => {
                    if (!selectedJob) return
                    
                    const note = {
                      id: Date.now().toString(),
                      text: noteText,
                      timestamp: new Date().toISOString(),
                      type: 'update',
                      author: 'contractor',
                      aiProcessed: true
                    }
                    
                    try {
                      const updatedJob = await jobsApi.addNote(selectedJob.id, note)
                      const transformedJob = transformJobFromDB(updatedJob)
                      
                      setJobs(prevJobs => 
                        prevJobs.map(job => job.id === selectedJob.id ? transformedJob : job)
                      )
                      
                      setSelectedJob(transformedJob)
                      
                      // Update tags if suggested
                      if (suggestedTags?.length > 0) {
                        await updateTagCounts()
                      }
                    } catch (err) {
                      console.error('[Dashboard] Failed to add voice note:', err)
                    }
                  }}
                  jobContext={selectedJob}
                />
              </div>

              <Separator />

              {/* Notes List */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Notes History</Label>
                {(selectedJob?.notes || []).length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <MessageCircle size={48} className="mx-auto mb-2 text-gray-300" />
                    <p>No notes yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {(selectedJob?.notes || []).map((note) => (
                      <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-[var(--deep-charcoal)] flex items-center justify-center text-white text-xs font-semibold">
                              {getInitials(note.author || 'Contractor')}
                            </div>
                            <div>
                              <div className="text-sm font-medium">{note.author || 'Contractor'}</div>
                              <div className="text-xs text-gray-500">
                                {formatDateTime(note.timestamp)}
                              </div>
                            </div>
                          </div>
                          {note.aiProcessed && (
                            <Badge variant="outline" className="text-xs">
                              <Sparkles size={10} className="mr-1" />
                              AI Processed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-700">{note.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4">
              <div className="text-center py-8">
                <ImageIcon size={48} className="mx-auto text-gray-300 mb-4" />
                <h4 className="font-semibold mb-2">Photo Gallery</h4>
                <p className="text-sm text-gray-600">Coming soon - upload before/during/after photos</p>
              </div>
            </TabsContent>

            <TabsContent value="summary" className="space-y-4">
              <div className="bg-gradient-to-r from-[var(--deep-charcoal)] to-[#1a1a2e] rounded-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="text-[var(--brushed-gold)]" size={20} />
                  <h4 className="font-semibold">AI-Powered Summary</h4>
                </div>
                <p className="text-sm text-gray-300 mb-4">
                  Get an instant AI-generated summary of this job including status, progress, and key information.
                </p>
                <Button 
                  onClick={async () => {
                    if (!selectedJob) return
                    try {
                      const summary = await generateJobSummary(selectedJob)
                      await jobsApi.updateAiSummary(selectedJob.id, summary)
                      
                      setJobs(prevJobs => 
                        prevJobs.map(j => 
                          j.id === selectedJob.id 
                            ? { ...j, aiSummary: summary }
                            : j
                        )
                      )
                      
                      setSelectedJob({ ...selectedJob, aiSummary: summary })
                    } catch (error) {
                      console.error('Failed to generate summary:', error)
                      alert('Failed to generate summary. Please check your API key configuration in Settings.')
                    }
                  }}
                  disabled={!getApiKey()}
                  className="w-full bg-[var(--brushed-gold)] text-[var(--deep-charcoal)] hover:bg-yellow-500"
                  size="sm"
                >
                  <Sparkles size={16} className="mr-2" />
                  {selectedJob?.aiSummary ? 'Regenerate Summary' : 'Generate AI Summary'}
                </Button>
              </div>

              {selectedJob?.aiSummary ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Bot size={18} className="text-[var(--deep-charcoal)]" />
                    <Label className="font-semibold">AI Summary</Label>
                  </div>
                  <p className="text-sm leading-relaxed">{selectedJob.aiSummary}</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Bot size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-sm text-gray-600">
                    Click the button above to generate an AI summary of this job
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Tag Manager Dialog */}
      <Dialog open={showTagManager} onOpenChange={setShowTagManager}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Tags</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="newTag">Create New Tag</Label>
              <div className="flex gap-2 mt-2">
                <Input
                  id="newTag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Enter tag name"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                />
                <Button onClick={handleAddTag} size="sm">
                  <Plus size={16} />
                </Button>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-sm font-medium">Existing Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2 max-h-60 overflow-y-auto">
                {tags.map(tag => (
                  <Badge key={tag.id} className={`flex items-center gap-2 ${tag.color}`}>
                    <TagIcon size={10} />
                    {tag.label}
                    <span className="text-xs">({tag.count})</span>
                    <Button
                      size="xs"
                      variant="ghost"
                      onClick={() => handleDeleteTag(tag.id)}
                      className="h-4 w-4 p-0 hover:text-red-500"
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="col-span-2">
              <Label htmlFor="edit-company">Company</Label>
              <Input
                id="edit-company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-clientName">Client Name</Label>
              <Input
                id="edit-clientName"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-clientEmail">Email</Label>
              <Input
                id="edit-clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-clientPhone">Phone</Label>
              <Input
                id="edit-clientPhone"
                value={formData.clientPhone}
                onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-jobType">Job Type</Label>
              <Select value={formData.jobType} onValueChange={(value) => setFormData({ ...formData, jobType: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPES.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-budget">Budget ($)</Label>
              <Input
                id="edit-budget"
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(status => (
                    <SelectItem key={status.value} value={status.value}>{status.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-estimatedCompletion">Est. Completion</Label>
              <Input
                id="edit-estimatedCompletion"
                type="date"
                value={formData.estimatedCompletion}
                onChange={(e) => setFormData({ ...formData, estimatedCompletion: e.target.value })}
              />
            </div>
            <div className="col-span-2">
              <Label htmlFor="edit-tags">Tags</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map(tag => (
                  <Badge
                    key={tag.id}
                    variant={formData.tags?.includes(tag.label) ? 'default' : 'outline'}
                    className={`cursor-pointer ${tag.color}`}
                    onClick={() => {
                      const currentTags = formData.tags || []
                      if (currentTags.includes(tag.label)) {
                        setFormData({ ...formData, tags: currentTags.filter(t => t !== tag.label) })
                      } else {
                        setFormData({ ...formData, tags: [...currentTags, tag.label] })
                      }
                    }}
                  >
                    <TagIcon size={10} className="mr-1" />
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowEditDialog(false); resetForm() }}>
              Cancel
            </Button>
            <Button onClick={handleUpdateJob} className="bg-[var(--deep-charcoal)]">
              Update Job
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
