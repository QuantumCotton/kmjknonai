import { useState, useEffect } from 'react'
import { 
  History as HistoryIcon, 
  Trash2, 
  RefreshCw, 
  Filter,
  ArrowLeft,
  Check,
  Plus
} from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'
import { Card } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { auditLogApi } from '@/lib/supabaseClient.js'

const ACTION_COLORS = {
  create: 'bg-green-500',
  update: 'bg-blue-500',
  delete: 'bg-red-500',
  restore: 'bg-purple-500'
}

const ACTION_LABELS = {
  create: 'Created',
  update: 'Updated',
  delete: 'Deleted',
  restore: 'Restored'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

export default function History() {
  const [auditLogs, setAuditLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [actionFilter, setActionFilter] = useState('all')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadAuditLogs()
  }, [])

  useEffect(() => {
    if (actionFilter === 'all') {
      setFilteredLogs(auditLogs)
    } else {
      setFilteredLogs(auditLogs.filter(log => log.action === actionFilter))
    }
  }, [actionFilter, auditLogs])

  const loadAuditLogs = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const logs = await auditLogApi.getAll(200)
      setAuditLogs(logs)
      setFilteredLogs(logs)
    } catch (err) {
      console.error('[History] Failed to load audit logs:', err)
      // Check if it's a table not found error
      if (err.message && err.message.includes('audit_log')) {
        setError('table_not_found')
      } else {
        setError('load_failed')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleRestore = async (jobId) => {
    if (!window.confirm('Are you sure you want to restore this job?')) return

    try {
      await auditLogApi.restoreJob(jobId)
      await loadAuditLogs()
      alert('Job restored successfully!')
    } catch (err) {
      console.error('[History] Failed to restore job:', err)
      alert('Failed to restore job. Please try again.')
    }
  }

  const getActionIcon = (action) => {
    switch (action) {
      case 'create':
        return <Plus size={14} />
      case 'update':
        return <RefreshCw size={14} />
      case 'delete':
        return <Trash2 size={14} />
      case 'restore':
        return <Check size={14} />
      default:
        return <HistoryIcon size={14} />
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--warm-off-white)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--deep-charcoal)] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading history...</p>
        </div>
      </div>
    )
  }

  if (error === 'table_not_found') {
    return (
      <div className="min-h-screen bg-[var(--warm-off-white)]">
        <header className="bg-[var(--deep-charcoal)] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HistoryIcon className="text-[var(--brushed-gold)]" size={28} />
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Job History</h1>
                <p className="text-sm text-gray-300">View & restore deleted jobs</p>
              </div>
            </div>
            <Button 
              onClick={() => window.location.href = '/dashboard'}
              variant="outline"
              className="text-white border-white"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-6">
          <Card className="p-12 text-center">
            <HistoryIcon size={48} className="mx-auto text-yellow-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">History Feature Not Set Up</h3>
            <p className="text-gray-600 mb-6">
              The audit_log table needs to be created in Supabase to enable the history feature.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
              <h4 className="font-medium text-yellow-800 mb-2">Setup Instructions:</h4>
              <ol className="text-left text-sm text-yellow-700 space-y-2">
                <li>1. Open your Supabase project</li>
                <li>2. Go to the SQL Editor</li>
                <li>3. Open the file <code className="bg-yellow-100 px-1 rounded">SUPABASE_AUDIT_TRAIL_SQL.sql</code> in your project</li>
                <li>4. Copy and run the SQL script</li>
                <li>5. Refresh this page</li>
              </ol>
            </div>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--warm-off-white)]">
      <header className="bg-[var(--deep-charcoal)] text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HistoryIcon className="text-[var(--brushed-gold)]" size={28} />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Job History</h1>
              <p className="text-sm text-gray-300">View & restore deleted jobs</p>
            </div>
          </div>
          <Button 
            onClick={() => window.location.href = '/dashboard'}
            variant="outline"
            className="bg-[#2a2a2a] text-white border-white hover:bg-[#3a3a3a]"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter size={18} className="text-gray-400" />
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="create">Created</SelectItem>
                  <SelectItem value="update">Updated</SelectItem>
                  <SelectItem value="delete">Deleted</SelectItem>
                  <SelectItem value="restore">Restored</SelectItem>
                </SelectContent>
              </Select>
              <Badge variant="outline" className="ml-2">
                {filteredLogs.length} entries
              </Badge>
            </div>
            <Button onClick={loadAuditLogs} variant="outline">
              <RefreshCw size={16} className="mr-2" />
              Refresh
            </Button>
          </div>
        </Card>

        {filteredLogs.length === 0 ? (
          <Card className="p-12 text-center">
            <HistoryIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold mb-2">No history found</h3>
            <p className="text-gray-600">
              {actionFilter !== 'all' 
                ? 'No entries for this action type'
                : 'No changes have been recorded yet'}
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <Card key={log.id} className="p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={`${ACTION_COLORS[log.action]} text-white`}>
                        {getActionIcon(log.action)}
                        <span className="ml-1">{ACTION_LABELS[log.action]}</span>
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {formatDate(log.timestamp)}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-medium text-[var(--deep-charcoal)]">
                          {log.client_name || 'Unknown Client'}
                        </span>
                        {log.company && (
                          <span className="text-gray-500">• {log.company}</span>
                        )}
                      </div>
                      
                      {log.action === 'update' && log.old_data && log.new_data && (
                        <div className="mt-2 p-3 bg-yellow-50 rounded border border-yellow-200">
                          <div className="text-xs text-yellow-800 font-medium mb-1">
                            Changes made:
                          </div>
                          <div className="text-xs text-yellow-700">
                            Status: {log.old_data.status} → {log.new_data.status}
                          </div>
                        </div>
                      )}
                      
                      {log.action === 'delete' && (
                        <div className="mt-2 p-3 bg-red-50 rounded border border-red-200">
                          <div className="text-xs text-red-800 font-medium mb-1">
                            Job was deleted:
                          </div>
                          <div className="text-xs text-red-700">
                            {log.old_data?.description || 'No description'}
                          </div>
                        </div>
                      )}
                      
                      {log.action === 'restore' && (
                        <div className="mt-2 p-3 bg-green-50 rounded border border-green-200">
                          <div className="text-xs text-green-800 font-medium">
                            Job was restored from deletion
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {log.action === 'delete' && (
                    <Button
                      size="sm"
                      onClick={() => handleRestore(log.job_id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <RefreshCw size={16} className="mr-2" />
                      Restore
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
