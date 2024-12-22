import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileName, fileUrl } = await req.json()

    // Send email using Supabase Edge Function
    const email = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'clips@gamefolio.com',
        to: 'hello@gamefolio.com',
        subject: 'New Video Clip Upload',
        html: `
          <h2>New Video Upload Notification</h2>
          <p>A new video clip has been uploaded to Gamefolio:</p>
          <ul>
            <li><strong>File Name:</strong> ${fileName}</li>
            <li><strong>File URL:</strong> ${fileUrl}</li>
          </ul>
        `,
      }),
    })

    if (!email.ok) {
      throw new Error('Failed to send email notification')
    }

    return new Response(
      JSON.stringify({ message: 'Email notification sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})