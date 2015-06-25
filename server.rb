require 'sinatra'
require 'json'

get '/' do
  redirect 'index.html'
end

get '/give_me_more' do
  ((1..10).map { rand 100_000_000 }).to_json
end
