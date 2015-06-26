require 'sinatra'
require 'json'

counter = 0

get '/' do
  redirect 'index.html'
end

get '/give_me_more' do
  counter += 1
  counter <= 3 ? ((1..10).map { rand 100_000_000 }).to_json : nil
end
