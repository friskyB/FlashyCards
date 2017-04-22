# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Subject.delete_all

Subject.create!(name: "Dinner Etiquete")
Subject.create!(name: "Wine")
Subject.create!(name: "Opera")
Subject.create!(name: "Museums")
Subject.create!(name: "Waltz")
Subject.create!(name: "Ties")

User.delete_all
User.create!(username: "flashy", password: "friskyb")
