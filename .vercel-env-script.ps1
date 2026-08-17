# Script to add OpenAI API key to Vercel
$apiKey = "YOUR_OPENAI_API_KEY_HERE"

Write-Host "Adding OpenAI API key to Vercel..." -ForegroundColor Green
echo $apiKey | vercel env add NEXT_PUBLIC_OPENAI_API_KEY production
echo $apiKey | vercel env add NEXT_PUBLIC_OPENAI_API_KEY preview
echo $apiKey | vercel env add NEXT_PUBLIC_OPENAI_API_KEY development

Write-Host ""
Write-Host "API key added! Now redeploying..." -ForegroundColor Green
vercel --prod

Write-Host ""
Write-Host "Done! Your AI Assistant should now work at:" -ForegroundColor Green
Write-Host "https://ai-system-design-builder.vercel.app" -ForegroundColor Cyan
