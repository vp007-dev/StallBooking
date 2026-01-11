import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Stall } from '@/types/stall';

export function useStalls() {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStalls();

    // Subscribe to realtime updates
    const channel = supabase
      .channel('stalls-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'stalls'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setStalls(prev => 
              prev.map(stall => 
                stall.id === (payload.new as Stall).id 
                  ? (payload.new as Stall) 
                  : stall
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchStalls() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('stalls')
        .select('*')
        .order('id');

      if (error) throw error;
      setStalls(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch stalls');
    } finally {
      setLoading(false);
    }
  }

  return { stalls, loading, error, refetch: fetchStalls };
}
