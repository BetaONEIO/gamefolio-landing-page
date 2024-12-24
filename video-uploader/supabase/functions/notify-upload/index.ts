import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    const body = await req.json()
    const { fileName, fileUrl, formData } = body

    if (!fileName || !fileUrl) {
      throw new Error('Missing required fields: fileName or fileUrl')
    }

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Gamefolio Clips <notifications@gamefolio.com>',
        to: 'hello@gamefolio.com',
        subject: 'New Video Upload on Gamefolio',
        html: `
          <h2>New Video Upload Notification</h2>
          <p>A new video clip has been uploaded to Gamefolio:</p>
          <ul>
            <li><strong>File Name:</strong> ${fileName}</li>
            <li><strong>File URL:</strong> ${fileUrl}</li>
          </ul>
          ${formData ? `
            <h3>Submitter Details:</h3>
            <ul>
              <li><strong>Name:</strong> ${formData.name}</li>
              <li><strong>Email:</strong> ${formData.email}</li>
              <li><strong>Creator Type:</strong> ${formData.creatorType}</li>
              <li><strong>Message:</strong> ${formData.message}</li>
            </ul>
          ` : ''}
        `,
      }),
    })

    if (!emailResponse.ok) {
      const error = await emailResponse.json()
      throw new Error(`Failed to send email: ${error.message}`)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Upload notification sent successfully'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Error processing request:', error.message)
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Internal server error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})